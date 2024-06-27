import React, { useEffect, useRef, useState } from "react";
import Editor, { DiffEditor } from "@monaco-editor/react";

const originalcode = `
import pygame
import random

# Initialize pygame
pygame.init()

# Define colors
white = (255, 255, 255)
yellow = (255, 255, 102)
black = (0, 0, 0)
red = (213, 50, 80)
green = (0, 255, 0)
blue = (50, 153, 213)

# Display dimensions
dis_width = 800
dis_height = 600

# Create display
dis = pygame.display.set_mode((dis_width, dis_height))
pygame.display.set_caption("Snake Game")

# Clock and snake block size
clock = pygame.time.Clock()
snake_block = 10
snake_speed = 15

# Font style
font_style = pygame.font.SysFont("bahnschrift", 25)
score_font = pygame.font.SysFont("comicsansms", 35)


def our_snake(snake_block, snake_list):
    for x in snake_list:
        pygame.draw.rect(dis, black, [x[0], x[1], snake_block, snake_block])


def message(msg, color):
    mesg = font_style.render(msg, True, color)
    dis.blit(mesg, [dis_width / 6, dis_height / 3])


def game_logic(x1, y1, x1_change, y1_change, snake_List, Length_of_snake, foodx, foody):
    x1 += x1_change
    y1 += y1_change
    snake_Head = [x1, y1]

    # Check for wall collisions
    game_close = False
    if x1 >= dis_width or x1 < 0 or y1 >= dis_height or y1 < 0:
        game_close = True

    # Append the new head to the snake list
    snake_List.append(snake_Head)
    if len(snake_List) > Length_of_snake:
        del snake_List[0]

    # Check for self-collision after the snake list is updated
    for segment in snake_List[:-1]:
        if segment == snake_Head:
            print(
                f"Collision detected: snake head {snake_Head} collided with {segment}"
            )
            game_close = True

    # Check for food collision
    if x1 == foodx and y1 == foody:
        foodx = round(random.randrange(0, dis_width - snake_block) / 10.0) * 10.0
        foody = round(random.randrange(0, dis_height - snake_block) / 10.0) * 10.0
        Length_of_snake += 1

    return x1, y1, snake_List, Length_of_snake, foodx, foody, game_close


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

        print("x1:", x1, "y1:", y1, "snakelist:", snake_List)
        while game_close:
            dis.fill(blue)
            message("You Lost! Press Q-Quit or C-Play Again", red)
            pygame.display.update()

            for event in pygame.event.get():
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_q:
                        game_over = True
                        game_close = False
                    if event.key == pygame.K_c:
                        gameLoop()

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                game_over = True
            if event.type == pygame.KEYDOWN:
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
 import pygame
 import random
 # Initialize pygame\npygame.init()\n\n# Define colors\nwhite = (255, 255, 255)\nyellow = (255, 255, 102)\nblack = (0, 0, 0)\nred = (213, 50, 80)\ngreen = (0, 255, 0)\nblue = (50, 153, 213)\n\n# Display dimensions\ndis_width = 800\ndis_height = 600\n\n# Create display\ndis = pygame.display.set_mode((dis_width, dis_height))\npygame.display.set_caption("Snake Game")\n\n# Clock and snake block size\nclock = pygame.time.Clock()\nsnake_block = 10\nsnake_speed = 15\n\n# Font style\nfont_style = pygame.font.SysFont("bahnschrift", 25)\nscore_font = pygame.font.SysFont("comicsansms", 35)\n\ndef our_snake(snake_block, snake_list):\n    for x in snake_list:\n        pygame.draw.rect(dis, black, [x[0], x[1], snake_block, snake_block])\n\ndef message(msg, color):\n    mesg = font_style.render(msg, True, color)\n    dis.blit(mesg, [dis_width / 6, dis_height / 3])\n\ndef game_logic(x1, y1, x1_change, y1_change, snake_List, Length_of_snake, foodx, foody):\n    x1 += x1_change\n    y1 += y1_change\n    snake_Head = [x1, y1]\n\n    # Check for wall collisions\n    game_close = False\n    if x1 >= dis_width or x1 < 0 or y1 >= dis_height or y1 < 0:\n        game_close = True\n\n    # Append the new head to the snake list\n    snake_List.append(snake_Head)\n    if len(snake_List) > Length_of_snake:\n        del snake_List[0]\n\n    # Check for self-collision after the snake list is updated\n    for segment in snake_List[:-1]:\n        if segment == snake_Head:\n            game_close = True\n\n    # Check for food collision\n    if x1 == foodx and y1 == foody:\n        foodx = round(random.randrange(0, dis_width - snake_block) / 10.0) * 10.0\n        foody = round(random.randrange(0, dis_height - snake_block) / 10.0) * 10.0\n        Length_of_snake += 1\n\n    return x1, y1, snake_List, Length_of_snake, foodx, foody, game_close\n\ndef gameLoop():\n    game_over = False\n    game_close = False\n    game_paused = False\n\n    x1 = dis_width / 2\n    y1 = dis_height / 2\n\n    x1_change = 0\n    y1_change = 0\n\n    snake_List = []\n    Length_of_snake = 1\n\n    foodx = round(random.randrange(0, dis_width - snake_block) / 10.0) * 10.0\n    foody = round(random.randrange(0, dis_height - snake_block) / 10.0) * 10.0\n\n    while not game_over:\n\n        while game_close:\n            dis.fill(blue)\n            message("You Lost! Press Q-Quit or C-Play Again", red)\n            pygame.display.update()\n\n            for event in pygame.event.get():\n                if event.type == pygame.KEYDOWN:\n                    if event.key == pygame.K_q:\n                        game_close = False\n                        game_over = True\n                    if event.key == pygame.K_c:\n                        gameLoop()\n\n        for event in pygame.event.get():\n            if event.type == pygame.QUIT:\n                game_over = True\n            if event.type == pygame.KEYDOWN:\n                if event.key == pygame.K_p:\n                    game_paused = not game_paused\n                if not game_paused:\n                    if event.key == pygame.K_LEFT:\n                        x1_change = -snake_block\n                        y1_change = 0\n                    elif event.key == pygame.K_RIGHT:\n                        x1_change = snake_block\n                        y1_change = 0\n                    elif event.key == pygame.K_UP:\n                        y1_change = -snake_block\n                        x1_change = 0\n                    elif event.key == pygame.K_DOWN:\n                        y1_change = snake_block\n                        x1_change = 0\n\n        if game_paused:\n            message("Game Paused. Press \'P\' to resume.", yellow)\n            pygame.display.update()\n            continue\n\n        x1, y1, snake_List, Length_of_snake, foodx, foody, game_close = game_logic(\n            x1, y1, x1_change, y1_change, snake_List, Length_of_snake, foodx, foody\n        )\n\n        dis.fill(blue)\n        pygame.draw.rect(dis, green, [foodx, foody, snake_block, snake_block])\n        our_snake(snake_block, snake_List)\n\n        # Display the score\n        score = Length_of_snake - 1\n        score_text = score_font.render("Score: " + str(score), True, white)\n        dis.blit(score_text, [0, 0])\n\n        pygame.display.update()\n        clock.tick(snake_speed)\n\n    pygame.quit()\n    quit()\n\nif __name__ == "__main__":\n    gameLoop()
 `;

function MonacoEditor() {
  const [code, setCode] = useState("// initial comment");

  return (
    <div>
      {/* <Editor
        height="50vh"
        width="50vw"
        defaultLanguage="python"
        defaultValue="// some comment"
        
        // value={code}
        onChange={(value) => setCode(value ?? "")}
      /> */}
      <DiffEditor
        height="50vh"
        width="50vw"
        language="python"
        options={{
          renderSideBySide: false,
          useInlineViewWhenSpaceIsLimited: false,
        }}
        original={originalcode}
        modified={modifiedcode}
      />
    </div>
  );
}
export default MonacoEditor;
