import cohere
import math
import os

from typing import TypedDict

from stray_sender_api import models

PROMPT = """You are evaluating a short, standalone insult. Score it between 0 (very poor) and 1 (excellent) based on its overall quality. Consider the following aspects:

Creativity – originality and inventiveness.

Shock Factor – surprising impact

Wittiness – cleverness or humor in phrasing.

Output only a single number between 0 and 1 representing the overall quality of the insult. Higher numbers indicate a more creative, witty, and impactful insult.

Example:
Input: "you look like you could finish a meal plan entirely by yourself"
Output: 0.87
"""

COHERE_API_KEY = os.getenv("COHERE_API_KEY", None)


class RankMessages:
    co: cohere.Client = cohere.Client(COHERE_API_KEY) 

    @classmethod
    def call(cls, input_msgs: list[models.Message] | None = None) -> None:
        messages = input_msgs if input_msgs else list(models.Message.objects.all())
        message_texts = [msg.content for msg in messages]
        prompt_relevance = cls._cohere_prompt_relevance(message_texts)
        thread_relevance = cls._cohere_thread_relevance([(msg.thread_id, msg) for msg in messages])
        for idx, msg in enumerate(messages):
            upvotes = msg.upvotes
            downvotes = msg.downvotes
            social_bias = cls._social_bias(upvotes, downvotes)
            prompt_score = prompt_relevance.get(idx, 0.0)
            thread_score = thread_relevance.get(idx, 0.0)
            final_score = 0.45 * social_bias + 0.4 * prompt_score + 0.15 * thread_score
            msg.score = int(final_score * 100)
            msg.save()
    
    @classmethod
    def _social_bias(cls, upvotes: int, downvotes: int) -> float:
        """Log-scaled bias from votes, mapped to [0,1] via sigmoid."""
        raw = math.log1p(upvotes) - math.log1p(downvotes)   # dampens large counts
        return 1 / (1 + math.exp(-raw))                     # sigmoid -> [0,1]

    @classmethod
    def _cohere_prompt_relevance(cls, messages: list[str]) -> dict[int, float]:
        prompt_results = cls.co.rerank(
         model="rerank-english-v3.0",
         query=f"Prompt: {PROMPT}",
         documents=messages,
         top_n=len(messages),
        )

        prompt_scores = {item.index: float(item.relevance_score) for item in prompt_results.results}
        return prompt_scores
    
    @classmethod
    def _cohere_thread_relevance(cls, thread_msgs: list[tuple[int, str]]) -> dict[int, float]:
        threads = {obj.id: obj for obj in models.Thread.objects.prefetch_related("messages").all()}
        thread_scores = {}
        for idx, (tid, msg) in enumerate(thread_msgs):
            thread = threads.get(tid)
            messages_in_thread: list[str] = [msg.content for msg in thread.messages.all()]
            results = cls.co.rerank(
            model="rerank-english-v3.0",
                query=f"Thread so far: {messages_in_thread}",
                documents=[msg.content],
                top_n=1,
            )
            thread_scores[idx] = float(results.results[0].relevance_score)

        return thread_scores

