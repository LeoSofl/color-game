// main.js
import Phaser from 'phaser';
import { SpinePlugin } from '@esotericsoftware/spine-phaser';
// import BootScene from './scenes/BootScene';
// import MenuScene from './scenes/MenuScene';
import GameScene from './scenes/GameScene';

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  backgroundColor: '#ffffff',
  parent: 'game-container',
  scene: [GameScene],
  plugins: {
    scene: [
      { key: 'SpinePlugin', plugin: SpinePlugin, mapping: 'spine' }
    ]
  }
};

new Phaser.Game(config);