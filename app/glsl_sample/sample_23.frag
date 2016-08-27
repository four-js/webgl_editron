precision mediump float;
uniform vec2  resolution;    // resolution (512.0, 512.0)
uniform vec2  mouse;         // mouse      (-1.0 ~ 1.0)
uniform float time;          // time       (1second == 1.0)
uniform sampler2D prevScene; // previous scene texture

// distance function
float sphere(vec3 p){
	return length(p) - 1.0;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

	// カメラを定義する
	vec3 cPos = vec3(0.0,  0.0,  3.0); // カメラの位置
	vec3 cDir = vec3(0.0,  0.0, -1.0); // カメラの向き(視線)
	vec3 cUp  = vec3(0.0,  1.0,  0.0); // カメラの上方向
	vec3 cSide = cross(cDir, cUp);     // 外積を使って横方向を算出
	float targetDepth = 1.0;           // フォーカスする深度

	// カメラの情報からレイを定義する
	vec3 ray = normalize(cSide * p.x + cUp * p.y + cDir * targetDepth);

	// マーチングループを組む
	float dist = 0.0;  // レイとオブジェクト間の最短距離
	float rLen = 0.0;  // レイに継ぎ足す長さ
	vec3  rPos = cPos; // レイの先端位置(初期位置)
	for(int i = 0; i < 32; ++i){
		dist = sphere(rPos);
		rLen += dist;
		rPos = cPos + ray * rLen;
	}

	// レイとオブジェクトの距離を確認
	if(abs(dist) < 0.001){
		gl_FragColor = vec4(vec3(1.0), 1.0);
	}else{
		gl_FragColor = vec4(vec3(0.0), 1.0);
	}
}

