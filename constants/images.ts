import { GraphicsDirectory, Split } from "@/app/types";

export const Sprites: {[key in GraphicsDirectory]: Split["sprites"]} = {
  grass: {
    skybox: require('@/assets/images/backgrounds/grass/skybox.png'),
    background: require('@/assets/images/backgrounds/grass/background.png'),
    ground: require("@/assets/images/backgrounds/grass/ground.png"),
    overlay: require("@/assets/images/backgrounds/grass/overlay.png"),
  },
  town: {
    skybox: require("@/assets/images/backgrounds/town/skybox.png"),
    background: undefined,
    ground: require("@/assets/images/backgrounds/town/ground.png"),
    overlay: require("@/assets/images/backgrounds/town/overlay.png"),
  },
  wasteland: {
    skybox: undefined,
    background: require("@/assets/images/backgrounds/wasteland/background.png"),
    ground: require("@/assets/images/backgrounds/wasteland/ground.png"),
    overlay: undefined,
  },
  cave: {
    skybox: undefined,
    background: require("@/assets/images/backgrounds/cave/background.png"),
    ground: require("@/assets/images/backgrounds/cave/ground.png"),
    overlay: require("@/assets/images/backgrounds/cave/overlay.png"),
  }, 
  lake: {
    skybox: undefined,
    background: require("@/assets/images/backgrounds/lake/background.png"),
    ground: require("@/assets/images/backgrounds/lake/ground.png"),
    overlay: undefined,
  },
  forest: {
    skybox: undefined,
    background: undefined,
    ground: require("@/assets/images/backgrounds/forest/ground.png"),
    overlay: require("@/assets/images/backgrounds/forest/overlay.png"),
  },
  marsh: {
    skybox: require("@/assets/images/backgrounds/marsh/skybox.png"),
    background: require("@/assets/images/backgrounds/marsh/background.png"),
    ground: require("@/assets/images/backgrounds/marsh/ground.png"),
    overlay: require("@/assets/images/backgrounds/marsh/overlay.png"),
  }
}