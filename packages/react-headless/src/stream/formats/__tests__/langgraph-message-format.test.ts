import { describe, expect, it } from "vitest";
import type { Message } from "../../../types";
import { langGraphMessageFormat } from "../langgraph-message-format";

describe("langGraphMessageFormat", () => {
  describe("toApi", () => {
    it("sends user text as a human message", () => {
      expect(
        langGraphMessageFormat.toApi([{ id: "user-1", role: "user", content: "Hello" }]),
      ).toEqual([{ type: "human", content: "Hello" }]);
    });

    it("converts binary parts to image_url content blocks", () => {
      const messages: Message[] = [
        {
          id: "user-1",
          role: "user",
          content: [
            { type: "text", text: "Describe these" },
            { type: "binary", mimeType: "image/png", data: "iVBORw0KGgo=" },
            { type: "binary", mimeType: "image/jpeg", url: "https://example.com/photo.jpg" },
          ],
        },
      ];

      expect(langGraphMessageFormat.toApi(messages)).toEqual([
        {
          type: "human",
          content: [
            { type: "text", text: "Describe these" },
            { type: "image_url", image_url: { url: "data:image/png;base64,iVBORw0KGgo=" } },
            { type: "image_url", image_url: { url: "https://example.com/photo.jpg" } },
          ],
        },
      ]);
    });
  });
});
