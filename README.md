# wsh でマウス操作をする

通常 wsh だけの機能ではマウスを操作することはできません。

手段としては EXCEL がインストールされていれば `ExecuteExcel4Macro` を呼び出して Win32API を叩けますが、
それ以外だと Win32API を叩く実行ファイルをダウンロードして、`WScript.Shell` から実行する方法もあります。

.dll や .exe のダウンロードが厳しい場合は下記 C# を自身でコンパイルする方法もあります。

```c#:mouse.cs
using System;
using System.Runtime.InteropServices;

namespace Device {
    public class Mouse {
        public static void Main (params string[] args) {
            string method = args[0];
            int posX = args.Length > 1 ? Int32.Parse(args[1]) : 0;
            int posY = args.Length > 2 ? Int32.Parse(args[2]) : 0;

            if (method == "pos") {
                SetCursorPos(posX, posY);
            }

            if (method == "click") {
                mouse_event(0x2, posX, posY, 0, 0);
                mouse_event(0x4, 0, 0, 0, 0);
            }

            if (method == "leftDown") {
                mouse_event(0x2, posX, posY, 0, 0);
            }

            if (method == "leftUp") {
                mouse_event(0x4, posX, posY, 0, 0);
            }

            if (method == "rightClick") {
                mouse_event(0x8, posX, posY, 0, 0);
                mouse_event(0x10, 0, 0, 0, 0);
            }

            if (method == "rightDown") {
                mouse_event(0x8, posX, posY, 0, 0);
            }

            if (method == "righttUp") {
                mouse_event(0x10, posX, posY, 0, 0);
            }
        }

        [DllImport("USER32.dll", CallingConvention = CallingConvention.StdCall)]
        public static extern void SetCursorPos(int X, int Y);

        [DllImport("USER32.dll", CallingConvention = CallingConvention.StdCall)]
        public static extern void mouse_event(int dwFlags, int dx, int dy, int cButtons, int dwExtraInfo);
    }
}
```

こちらを

```shell
C:\Windows\Microsoft.NET\Framework\v4.0.30319\csc.exe /target:exe /out:mouse.exe .\mouse.cs
```

でコンパイルして

```
var Shell = WScript.CreateObject('WScript.Shell')

function SetCursorPos (x, y) {
    Shell.Exec('mouse pos 100 100')
}

function Click () {
    Shell.Exec('mouse click')
}

SetCursorPos(100, 200)
WScript.Sleep(500)
Click()
```

で操作できます。

もし .dll や .exe などの実行ファイルのダウンロードやコンパイルが出来ない環境の場合は
wes から C# を直接実行して操作ができます。

[wes](https://github.com/wachaon/wes) は WSH のスクリプトを今風の記述で開発できるフレームワークです。

+  `require/module.exports` や `import/export` が記述でき、モジュール単位で開発可能
+  一般的なファイル操作はビルトインモジュールで対応しているので「車輪の再開発」をしなくても良い
+  WSHのフレームワークなので、EXCEL などの COM 操作も従来通り可能
+  外部パッケージをインストールすることも可能。

などの特徴があります。

wes の入手方法は [wes](https://github.com/wachaon/wes) から wes.js をコピーしてファイルを作成するか、
コンソールで次のコマンドを実行してください。

```bat
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/wes.js %CD%\\wes.js
```

wes の [@wachaon/mouse](https://github.com/wachaon/mouse) をインストールします。

```bat
wes install @wachaon/mouse --bare
```

```javascript
const mouse = require('mouse')

mouse.pos(100, 100)
mouse.click()
```
