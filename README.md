# Laya小游戏基础框架

该项目为Laya1游戏开发的基础框架，包括常用工具类
Laya版本：1.8.9

### 框架结构
	js	该目录为Laya将ts编译出来的bin目录
	ts	该目录为Laya的src目录，
	wxcode	该目录项目目录，非完整项目



### 主要功能： 
		1、分包加载功能 
		2、页面切换功能 
		3、常用工具类：Map、Log、Banner、Sound等 
		5、基础页面及对话框 
		6、加载页、首页、游戏页、过关结算页 只完成基本框架，没实现业务逻辑 
		7、屏幕适配
		
### 主要文件、目录（详见文件注释）：
		wxcode/src/Game.ts					框架入口文件
		wxcode/src/config.ts				框架配置文件
		
		wxcode/src/widget					自定义控件存放目录
		wxcode/src/widget/ProgressView.ts	进度条（由遮罩效果实现，需要WebGl）
		
		wxcode/src/utils					工具类存放目录
		wxcode/src/utils/AniUtils.ts		公共动效类
		wxcode/src/utils/Common.ts			游戏设置类
		wxcode/src/utils/imageRunTime.ts	点击效果类
		wxcode/src/utils/log.ts				统一日志打印类
		wxcode/src/utils/Map.ts				键值对工具类
		wxcode/src/utils/question.ts		游戏关卡定义类
		wxcode/src/utils/SharedUtils.ts		分享工具类
		wxcode/src/utils/sound.ts			声音工具类
		wxcode/src/utils/syncUtil.ts		同步工具类
		wxcode/src/utils/wxUtils.ts			微信工具类
		
		wxcode/src/ui						Laya界面目录（自动生成）
		
		wxcode/src/home						游戏首页、加载页目录
		wxcode/src/home/LoadPage.ts			加载页
		
		wxcode/src/game						游戏相关类目录
		wxcode/src/game/GameInfo.ts			游戏主页
		wxcode/src/game/PassPage.ts			过关结算页
		wxcode/src/game/SettingsDialog.ts	游戏设置对话框
		
		wxcode/src/effect					特效相关目录
		wxcode/src/effect/CaiDai.ts			过关小彩带
		
### 接口说明
		js/js/Game.js				loadLaya()：	小游戏入口函数，初始舞台，加载图集，加载缓存，加载LoadPage
		js/js/home/LoadPage.js		loadRes(callBack:Function):		加载分包或网络资源，加载完成后，回调callBack
		js/js/game/GameInfo.js		initGameUi() ：	加载游戏界面，游戏逻辑由此入
		js/js/game/PassPage.js		setData(data:any):	过关数据展示
		js/js/game/PassPage.js		nextClick():	点击下一关
		
### License
	
released under the [Apache 2.0 license](LICENSE).

```
Copyright 2020 WeBuzz Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```