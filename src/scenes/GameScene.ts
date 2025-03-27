// src/scenes/GameScene.ts
import { SpineGameObject } from '@esotericsoftware/spine-phaser';
import Phaser from 'phaser';

interface ColorOption {
  key: string;
  value: number;
  displayName: string;
}

export default class GameScene extends Phaser.Scene {
  private currentColor: string | null = null;
  private flower: SpineGameObject | null = null;
  private colorOptions: ColorOption[] = [
    { key: 'red', value: 0xff0000, displayName: '红色' },
    { key: 'yellow', value: 0xffff00, displayName: '黄色' },
    { key: 'green', value: 0x00ff00, displayName: '绿色' }
  ];

  constructor() {
    super('GameScene');
  }

  preload(): void {
    this.load.audio('vo_scene1_bgm', 'assets/Sounds/BGM/mp3/Scene1.mp3');
  }

  create(): void {
    // 创建背景
    this.add.image(512, 384, 'background');
    
    // // 加载Spine动画
    // this.flower = this.spine.create('flower', 0.5);
    // if (this.flower) {
    //   this.flower.setPosition(400, 400);
    //   this.flower.setAnimation(0, 'idle', true);
    // }

    this.sound.play('vo_scene1_bgm');
      
    // 创建颜色选择器
    this.createColorPalette();
    
    // 添加可点击区域
    this.createClickableAreas();
    
    // 播放开场语音
    this.sound.play('vo_scene1_bgm');
  }
  
  private createColorPalette(): void {
    this.colorOptions.forEach((color, index) => {
      const colorBtn = this.add.circle(100 + index * 80, 600, 30, color.value);
      colorBtn.setInteractive();
      colorBtn.on('pointerdown', () => {
        this.currentColor = color.key;
        // 播放选择颜色的语音
        this.sound.play(`vo_pick_any_color`);
      });
    });
  }
  
  private createClickableAreas(): void {
    // 创建花朵的可点击区域
    const flowerArea = this.add.zone(400, 400, 200, 200);
    flowerArea.setInteractive();
    flowerArea.on('pointerdown', () => {
      if (this.currentColor && this.flower) {
        // 改变花朵颜色 (通过Spine的换肤功能)
        // this.flower.setSkinByName(this.currentColor);
        // 播放相应语音
        this.sound.play(`vo_paint_the_flower_${this.currentColor}`);
      } else {
        // 提示选择颜色
        this.sound.play('vo_pick_any_color');
      }
    });
  }
}