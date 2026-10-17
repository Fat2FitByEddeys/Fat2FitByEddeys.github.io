from app.llm.base import LLMProvider

PLANNER_SYSTEM_PROMPT = """You are the Planner Agent in a research system.
Given a user's research question, break it into 2-5 concrete sub-tasks that
can be answered using retrieval over the user's uploaded documents.
Do not invent tasks requiring external tools that don't exist yet."""

PLANNER_SCHEMA = {
    "type": "object",
    "properties": {
        "objective": {"type": "string"},
        "tasks": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {"type": "string"},
                    "description": {"type": "string"},
                    "required_tool": {"type": "string", "enum": ["retrieval"]},
                    "priority": {"type": "string", "enum": ["high", "medium", "low"]},
                },
                "required": ["id", "description", "required_tool", "priority"],
            },
        },
    },
    "required": ["objective", "tasks"],
}


def plan(llm: LLMProvider, query: str) -> dict:
    return llm.generate_structured(prompt=query, schema=PLANNER_SCHEMA, system=PLANNER_SYSTEM_PROMPT)
