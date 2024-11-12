export const MODEL_TYPES = {
  CLAUDE_3_5: "CLAUDE_3_5",
  LLAMA_3_70B: "LLAMA_3_70B"
};

const constants = {
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE: 1,
  CAPTIONS_AI_BASE_URL: "https://k1.captions-dev.xyz/api",
  SUPPORTED_OPERATIONS: {
    GET_CREATORS: "get-creators",
    CREATE_VIDEO: "create-video",
    GET_VIDEO_STATUS: "get-video-status",
    GET_SUPPORTED_LANGUAGES: "get-supported-languages"
  },
  ARGIL_AI_BASE_URL: "https://api.argil.ai",
  LLM_MODEL: {
    CLAUDE_3_5: {
      MODEL: "claude-3-5-sonnet-20240620",
      TEMPERATURE: 0,
      MAX_TOKENS: 4096,
      USER_PROMPT: "execute; always return a json output; no yapping."
    },
    LLAMA_3_70B: {
      MODEL: "meta/meta-llama-3-70b-instruct",
      TEMPERATURE: 0,
      MAX_TOKENS: 4096
    }
  },
  DEFAULT_MODEL: MODEL_TYPES.LLAMA_3_70B
};

export default constants;
