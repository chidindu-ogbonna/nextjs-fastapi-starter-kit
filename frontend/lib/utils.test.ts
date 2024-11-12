import { extractArrayJSONFromText } from "./utils";

describe("extractArrayJSONFromText", () => {
  it("format 1", () => {
    const text = `Here's an enhanced script for a short-form video about Fela, formatted as requested:
        \`\`\`json
        [
        {
            "narrator": "Picture this: The roar of the crowd, the tension in the air. It's the Olympics, and everyone's eyes are on the scoreboard.",
            "duration_in_seconds": "6"
        }
        ]
        \`\`\``;
    expect(extractArrayJSONFromText(text)).toEqual({
      result: [
        {
          narrator:
            "Picture this: The roar of the crowd, the tension in the air. It's the Olympics, and everyone's eyes are on the scoreboard.",
          duration_in_seconds: "6"
        }
      ]
    });
  });

  it("format 2", () => {
    const text = `Here's an enhanced script for a short-form video about Fela, formatted as requested:
    \`\`\`
    [
    {
        "narrator": "Picture this: The roar of the crowd, the tension in the air. It's the Olympics, and everyone's eyes are on the scoreboard.",
        "duration_in_seconds": 6
    }
    ]
    \`\`\`
    This script aims to create a sense of excitement and empowerment, highlighting Fela's unique value proposition and its impressive performance in the Olympics. The narrator's tone is encouraging and motivational, urging the audience to join the winning team and start predicting like a pro. The script is concise, engaging, and easy to follow, making it perfect for a short-form video on Instagram, TikTok, or YouTube.`;
    expect(extractArrayJSONFromText(text)).toEqual({
      result: [
        {
          narrator:
            "Picture this: The roar of the crowd, the tension in the air. It's the Olympics, and everyone's eyes are on the scoreboard.",
          duration_in_seconds: 6
        }
      ]
    });
  });

  it("format 3", () => {
    const text = `Here's an enhanced script for a short-form video about Fela, formatted as requested:
    [
    {
        "narrator": "Picture this: The roar of the crowd, the tension in the air. It's the Olympics, and everyone's eyes are on the scoreboard.",
        "duration_in_seconds": "6"
    }
    ]`;
    expect(extractArrayJSONFromText(text)).toEqual({
      result: [
        {
          narrator:
            "Picture this: The roar of the crowd, the tension in the air. It's the Olympics, and everyone's eyes are on the scoreboard.",
          duration_in_seconds: "6"
        }
      ]
    });
  });

  it("format 4", () => {
    const text = `Here's an enhanced script for a short-form video about Fela, formatted as requested:
    [
    {
        "narrator": "Picture this: The roar of the crowd, the tension in the air. It's the Olympics, and everyone's eyes are on the scoreboard.",
        "duration_in_seconds": "6"
    }
    ]
    That's the result you're looking for.
    `;
    expect(extractArrayJSONFromText(text)).toEqual({
      result: [
        {
          narrator:
            "Picture this: The roar of the crowd, the tension in the air. It's the Olympics, and everyone's eyes are on the scoreboard.",
          duration_in_seconds: "6"
        }
      ]
    });
  });

  it("format 5", () => {
    const text = `
    Here is the enhanced script:
[
  { narrator: "Imagine the thrill of victory, the rush of adrenaline as your team scores the winning goal...", duration_in_seconds: 5 },
  { narrator: "You made the prediction, and it paid off. Big time.", duration_in_seconds: 3 },
  { narrator: "Introducing Fela, the sports betting app that's changing the game.", duration_in_seconds: 4 },
  { narrator: "In the Olympics, Fela outperformed even the bookmakers, proving its accuracy and expertise.", duration_in_seconds: 6 },
  { narrator: "With Fela, you're not just guessing - you're making informed, data-driven decisions that lead to wins.", duration_in_seconds: 5 },
  { narrator: "Join the winning team. Download Fela now and start predicting like a pro.", duration_in_seconds: 4 }
]
this is the end of the text
`;
    expect(extractArrayJSONFromText(text)).toEqual({
      result: [
        {
          narrator:
            "Imagine the thrill of victory, the rush of adrenaline as your team scores the winning goal...",
          duration_in_seconds: 5
        },
        {
          narrator: "You made the prediction, and it paid off. Big time.",
          duration_in_seconds: 3
        },
        {
          narrator:
            "Introducing Fela, the sports betting app that's changing the game.",
          duration_in_seconds: 4
        },
        {
          narrator:
            "In the Olympics, Fela outperformed even the bookmakers, proving its accuracy and expertise.",
          duration_in_seconds: 6
        },
        {
          narrator:
            "With Fela, you're not just guessing - you're making informed, data-driven decisions that lead to wins.",
          duration_in_seconds: 5
        },
        {
          narrator:
            "Join the winning team. Download Fela now and start predicting like a pro.",
          duration_in_seconds: 4
        }
      ]
    });
  });

  it("format 6", () => {
    const text = `

    Here is the enhanced script:

[
  { narrator: "clear:", duration_in_seconds: 7 },
]

This script aims to create a sense of excitement and possibility, while highlighting Microsoft's commitment to AI, cloud computing, and innovation. The narrator's tone is inspiring and thought-provoking, encouraging the audience to imagine a future where technology empowers humanity. The script is concise, with a total length of 37 seconds, and maintains the brand's voice and message.

`;
    expect(extractArrayJSONFromText(text)).toEqual({
      result: [
        {
          narrator: "clear:",
          duration_in_seconds: 7
        }
      ]
    });
  });
});
