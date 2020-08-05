# Laya小游戏基础框架

该项目为Laya1游戏开发的基础框架，包括常用工具类
Laya版本：1.8.9


### 主要功能： 
		1、分包加载功能 
		2、页面切换功能 
		3、常用工具类：Map、Log、Banner、Sound等 
		5、基础页面及对话框 
		6、加载页、首页、游戏页、过关结算页 只完成基本框架，没实现业务逻辑 
		7、屏幕适配
		
### 主要文件、目录（详见文件注释）：
		js/js/Game.js					框架入口文件
		js/js/config.js				框架配置文件
		
		js/js/widget					自定义控件存放目录
		js/js/widget/ProgressView.js	进度条（由遮罩效果实现，需要WebGl）
		
		js/js/utils					工具类存放目录
		js/js/utils/AniUtils.js		公共动效类
		js/js/utils/Common.js			游戏设置类
		js/js/utils/imageRunTime.js	点击效果类
		js/js/utils/log.js				统一日志打印类
		js/js/utils/Map.js				键值对工具类
		js/js/utils/question.js		游戏关卡定义类
		js/js/utils/SharedUtils.js		分享工具类
		js/js/utils/sound.js			声音工具类
		js/js/utils/syncUtil.js		同步工具类
		js/js/utils/wxUtils.js			微信工具类
		
		js/js/ui						Laya界面目录（自动生成）
		
		js/js/home						游戏首页、加载页目录
		js/js/home/LoadPage.js			加载页
		
		js/js/game						游戏相关类目录
		js/js/game/GameInfo.js			游戏主页
		js/js/game/PassPage.js			过关结算页
		js/js/game/SettingsDialog.js	游戏设置对话框
		
		js/js/effect					特效相关目录
		js/js/effect/CaiDai.js			过关小彩带
		
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