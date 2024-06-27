import React, { use, useEffect, useRef, useState } from "react";
import Editor, { DiffEditor } from "@monaco-editor/react";

const originalcode = `
def gameLoop():
    game_over = False
    game_close = False

    x1 = dis_width / 2
    y1 = dis_height / 2

    x1_change = 0
    y1_change = 0

    snake_List = []
    Length_of_snake = 1

    foodx = round(random.randrange(0, dis_width - snake_block) / 10.0) * 10.0
    foody = round(random.randrange(0, dis_height - snake_block) / 10.0) * 10.0

    while not game_over:

        while game_close:
            dis.fill(blue)
            message("You Lost! Press Q-Quit or C-Play Again", red)
            pygame.display.update()

            for event in pygame.event.get():
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_q:
                        game_close = False
                        game_over = True
                    if event.key == pygame.K_c:
                        gameLoop()

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                game_over = True
            if event.type == pygame.KEYDOWN:
                if not game_paused:
                    if event.key == pygame.K_LEFT:
                        x1_change = -snake_block
                        y1_change = 0
                    elif event.key == pygame.K_RIGHT:
                        x1_change = snake_block
                        y1_change = 0
                    elif event.key == pygame.K_UP:
                        y1_change = -snake_block
                        x1_change = 0
                    elif event.key == pygame.K_DOWN:
                        y1_change = snake_block
                        x1_change = 0

        
        x1, y1, snake_List, Length_of_snake, foodx, foody, game_close = game_logic(
            x1, y1, x1_change, y1_change, snake_List, Length_of_snake, foodx, foody
        )

        dis.fill(blue)
        pygame.draw.rect(dis, green, [foodx, foody, snake_block, snake_block])
        our_snake(snake_block, snake_List)

        # Display the score
        score = Length_of_snake - 1
        score_text = score_font.render("Score: " + str(score), True, white)
        dis.blit(score_text, [0, 0])

        pygame.display.update()
        clock.tick(snake_speed)

    pygame.quit()
    quit()


if __name__ == "__main__":
    gameLoop()
`;

const modifiedcode = `
def gameLoop():
    game_over = False
    game_close = False
    game_paused = False

    x1 = dis_width / 2
    y1 = dis_height / 2

    x1_change = 0
    y1_change = 0

    snake_List = []
    Length_of_snake = 1

    foodx = round(random.randrange(0, dis_width - snake_block) / 10.0) * 10.0
    foody = round(random.randrange(0, dis_height - snake_block) / 10.0) * 10.0

    while not game_over:

        while game_close:
            dis.fill(blue)
            message("You Lost! Press Q-Quit or C-Play Again", red)
            pygame.display.update()

            for event in pygame.event.get():
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_q:
                        game_close = False
                        game_over = True
                    if event.key == pygame.K_c:
                        gameLoop()

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                game_over = True
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_p:
                    game_paused = not game_paused
                if not game_paused:
                    if event.key == pygame.K_LEFT:
                        x1_change = -snake_block
                        y1_change = 0
                    elif event.key == pygame.K_RIGHT:
                        x1_change = snake_block
                        y1_change = 0
                    elif event.key == pygame.K_UP:
                        y1_change = -snake_block
                        x1_change = 0
                    elif event.key == pygame.K_DOWN:
                        y1_change = snake_block
                        x1_change = 0

        if game_paused:
            message("Game Paused. Press 'P' to resume.", yellow)
            pygame.display.update()
            continue

        x1, y1, snake_List, Length_of_snake, foodx, foody, game_close = game_logic(
            x1, y1, x1_change, y1_change, snake_List, Length_of_snake, foodx, foody
        )

        dis.fill(blue)
        pygame.draw.rect(dis, green, [foodx, foody, snake_block, snake_block])
        our_snake(snake_block, snake_List)

        # Display the score
        score = Length_of_snake - 1
        score_text = score_font.render("Score: " + str(score), True, white)
        dis.blit(score_text, [0, 0])

        pygame.display.update()
        clock.tick(snake_speed)

    pygame.quit()
    quit()


if __name__ == "__main__":
    gameLoop()
`;

function MonacoEditor({ shouldAnimate }: { shouldAnimate: boolean }) {
  const [modifiedCode, setModifiedCode] = useState(originalcode);

  const diffEditorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    diffEditorRef.current = editor;
    console.log(
      diffEditorRef.current.getModifiedEditor().getValue().split("\n")
    );
  }

  //   const diffLines = [
  //     { line: 3, text: "    game_paused = False\n" },
  //     { line: 29, text: "                if event.key == pygame.K_p:\n" },
  //     { line: 30, text: "                    game_paused = not game_paused\n" },
  //     {
  //       line: 42,
  //       text: "        if game_paused:\n            message(\"Game Paused. Press 'P' to resume.\", yellow)\n            pygame.display.update()\n            continue\n",
  //     },
  //   ];

  useEffect(() => {
    if (!shouldAnimate) {
      return;
    }
    console.log("initializing timer");
    const timer = setTimeout(() => {
      setModifiedCode(modifiedcode);
    }, 2000); // Wait for 2 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [shouldAnimate]);

  return (
    <div>
      <DiffEditor
        height="50vh"
        width="100%"
        language="python"
        options={{
          renderSideBySide: false,
          useInlineViewWhenSpaceIsLimited: false,
        }}
        original={originalcode}
        modified={modifiedCode}
        onMount={handleEditorDidMount}
      />
    </div>
  );
}

export default MonacoEditor;
