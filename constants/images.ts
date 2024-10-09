import { GraphicsDirectory, Split } from "@/app/types";

export const Sprites: {[key in GraphicsDirectory]: Split["sprites"]} = {
  grass: {
    skybox: require('@/assets/images/backgrounds/grass/skybox.png'),
    ground: require("@/assets/images/backgrounds/grass/ground.png"),
    overlay: require("@/assets/images/backgrounds/grass/overlay.png"),
  },
  town: {
    skybox: require("@/assets/images/backgrounds/town/skybox.png"),
    ground: require("@/assets/images/backgrounds/town/ground.png"),
    overlay: require("@/assets/images/backgrounds/town/overlay.png"),
  }
}