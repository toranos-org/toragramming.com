__NUXT_JSONP__("/others/git/how-to-use-github-cli-for-windows", (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,_,$,aa,ab,ac,ad,ae,af,ag,ah,ai,aj,ak,al,am,an,ao,ap,aq,ar,as,at,au,av,aw,ax,ay,az,aA,aB,aC,aD,aE,aF,aG,aH,aI,aJ,aK,aL,aM,aN,aO,aP,aQ,aR,aS,aT){return {data:[{isPost:true,document:{slug:"how-to-use-github-cli-for-windows",description:"Windows で GitHub をコマンドラインベース操作できるようになる GitHub CLI を紹介します。",title:"GitHub CLI 『gh』の使い方 for Windows",thumbnail:Z,createdAt:"2020-02-17T00:00:00.000Z",updatedAt:"2020-02-18T00:00:00.000Z",toc:[{id:ag,depth:B,text:ah},{id:ai,depth:B,text:aj},{id:R,depth:F,text:R},{id:ak,depth:F,text:al},{id:am,depth:B,text:an},{id:ao,depth:B,text:ap},{id:aq,depth:B,text:"gh pr - Pull Request 関連"},{id:ar,depth:F,text:as},{id:at,depth:F,text:au},{id:av,depth:F,text:aw},{id:ax,depth:F,text:ay},{id:az,depth:F,text:aA},{id:aB,depth:B,text:"gh issue - issue 関連"},{id:S,depth:B,text:S},{id:T,depth:B,text:T}],body:{type:"root",children:[{type:b,tag:C,props:{id:ag},children:[{type:b,tag:h,props:{href:"#github-cli-%E3%81%A8%E3%81%AF",ariaHidden:j,tabIndex:k},children:[{type:b,tag:d,props:{className:[l,m]},children:[]}]},{type:a,value:ah}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"GitHub 公式製の "},{type:b,tag:_,props:{},children:[{type:a,value:"GitHub 操作コマンドラインツール"}]},{type:a,value:" です。"}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:b,tag:h,props:{href:"https:\u002F\u002Fgithub.com\u002Fcli\u002Fcli",rel:[w,x,y],target:z},children:[{type:a,value:"gh : The GitHub CLI tool"}]}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"注意: 2020\u002F02\u002F17 現在、gh は Beta 版ですので、今後仕様が変わる可能性があります。"}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"GitHub の CLI といえば、"},{type:b,tag:h,props:{href:"https:\u002F\u002Fgithub.com\u002Fgithub\u002Fhub",rel:[w,x,y],target:z},children:[{type:a,value:U}]},{type:a,value:" がありますが、公式はその違いを以下のように表明しています。"}]},{type:a,value:c},{type:b,tag:"blockquote",props:{},children:[{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"引用元："},{type:b,tag:h,props:{href:"https:\u002F\u002Fgithub.com\u002Fcli\u002Fcli#comparison-with-hub",rel:[w,x,y],target:z},children:[{type:a,value:"Comparison with hub - gh"}]}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"長年、"},{type:b,tag:e,props:{},children:[{type:a,value:U}]},{type:a,value:" が非公式の GitHub CLI ツールでした。 "},{type:b,tag:e,props:{},children:[{type:a,value:V}]},{type:a,value:" は、根本的に異なったデザインの公式 CLI ツールがどのようなものになるかを探求するための新しいプロジェクトです。どちらもターミナルで GitHub を使えるようにしますが、"},{type:b,tag:e,props:{},children:[{type:a,value:U}]},{type:a,value:" は "},{type:b,tag:e,props:{},children:[{type:a,value:"git"}]},{type:a,value:" の "},{type:b,tag:e,props:{},children:[{type:a,value:"proxy"}]},{type:a,value:" として動作し、一方 "},{type:b,tag:e,props:{},children:[{type:a,value:V}]},{type:a,value:" はスタンドアロンツールです。"}]},{type:a,value:c}]},{type:a,value:c},{type:b,tag:C,props:{id:ai},children:[{type:b,tag:h,props:{href:"#windows-%E3%81%A7%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E6%96%B9%E6%B3%95",ariaHidden:j,tabIndex:k},children:[{type:b,tag:d,props:{className:[l,m]},children:[]}]},{type:a,value:aj}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"※当記事は、Windows 環境を前提としています。"}]},{type:a,value:c},{type:b,tag:G,props:{id:R},children:[{type:b,tag:h,props:{href:"#%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%A9%E3%83%BC%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95",ariaHidden:j,tabIndex:k},children:[{type:b,tag:d,props:{className:[l,m]},children:[]}]},{type:a,value:R}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:b,tag:h,props:{href:aC,rel:[w,x,y],target:z},children:[{type:a,value:aC}]},{type:a,value:" にアクセスし、"},{type:b,tag:e,props:{},children:[{type:a,value:"Download for Windows"}]},{type:a,value:" をクリックし、インストーラーをダウンロードします。"}]},{type:a,value:c},{type:b,tag:D,props:{src:"how-to-install-github-cli-1.png",alt:"GitHub CLI インストール手順 1"},children:[{type:a,value:c}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"続いて、以下に従ってインストールを進めます。"}]},{type:a,value:c},{type:b,tag:D,props:{src:"how-to-install-github-cli-2.png",alt:"GitHub CLI インストール手順 2"},children:[{type:a,value:c}]},{type:a,value:c},{type:b,tag:D,props:{src:"how-to-install-github-cli-3.png",alt:"GitHub CLI インストール手順 3"},children:[{type:a,value:c}]},{type:a,value:c},{type:b,tag:D,props:{src:"how-to-install-github-cli-4.png",alt:"GitHub CLI インストール手順 4"},children:[{type:a,value:c}]},{type:a,value:c},{type:b,tag:D,props:{src:"how-to-install-github-cli-5.png",alt:"GitHub CLI インストール手順 5"},children:[{type:a,value:c}]},{type:a,value:c},{type:b,tag:D,props:{src:"how-to-install-github-cli-6.png",alt:"GitHub CLI インストール手順 6"},children:[{type:a,value:c}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"以上でインストールは完了です。"}]},{type:a,value:c},{type:b,tag:G,props:{id:ak},children:[{type:b,tag:h,props:{href:"#scoop-%E3%82%92%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95",ariaHidden:j,tabIndex:k},children:[{type:b,tag:d,props:{className:[l,m]},children:[]}]},{type:a,value:al}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:b,tag:h,props:{href:"https:\u002F\u002Fgithub.com\u002Flukesampson\u002Fscoop",rel:[w,x,y],target:z},children:[{type:a,value:"Scoop"}]},{type:a,value:" を導入されている方は、以下のコマンドでインストールができます。"}]},{type:a,value:c},{type:b,tag:p,props:{className:[q]},children:[{type:b,tag:r,props:{className:[s,t]},children:[{type:b,tag:e,props:{},children:[{type:a,value:"scoop bucket "},{type:b,tag:d,props:{className:[g,A]},children:[{type:a,value:"add"}]},{type:a,value:" github-gh https:\u002F\u002Fgithub.com\u002Fcli\u002Fscoop-gh.git\nscoop "},{type:b,tag:d,props:{className:[g,A]},children:[{type:a,value:"install"}]},{type:a,value:" gh\n"}]}]}]},{type:a,value:c},{type:b,tag:C,props:{id:am},children:[{type:b,tag:h,props:{href:"#github-cli-%E3%81%AE%E8%AA%8D%E8%A8%BC",ariaHidden:j,tabIndex:k},children:[{type:b,tag:d,props:{className:[l,m]},children:[]}]},{type:a,value:an}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"初めて "},{type:b,tag:e,props:{},children:[{type:a,value:V}]},{type:a,value:" コマンドを実行すると認証を求められます。"}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"適当なコマンドを実行してみましょう。"}]},{type:a,value:c},{type:b,tag:p,props:{className:[q]},children:[{type:b,tag:r,props:{className:[s,t]},children:[{type:b,tag:e,props:{},children:[{type:a,value:H},{type:b,tag:d,props:{className:[g,A]},children:[{type:a,value:I}]},{type:a,value:" list\n"}]}]}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"すると、以下のように表示されますので、"},{type:b,tag:e,props:{},children:[{type:a,value:aD}]},{type:a,value:" を押します。"}]},{type:a,value:c},{type:b,tag:p,props:{className:[q]},children:[{type:b,tag:r,props:{className:[s,t]},children:[{type:b,tag:e,props:{},children:[{type:a,value:"Notice: authentication required\nPress Enter to "},{type:b,tag:d,props:{className:[g,A]},children:[{type:a,value:"open"}]},{type:a,value:" github.com "},{type:b,tag:d,props:{className:[g,J]},children:[{type:a,value:W}]},{type:a,value:" your browser"},{type:b,tag:d,props:{className:[g,o]},children:[{type:a,value:".."}]},{type:a,value:".\n"}]}]}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"Web ブラウザが開くので、"},{type:b,tag:e,props:{},children:[{type:a,value:"Authorize github"}]},{type:a,value:" ボタンを押下し、認証完了です。"}]},{type:a,value:c},{type:b,tag:D,props:{src:"how-to-authorize-github-cli-1.png",alt:"GitHub CLI 認証手順 1"},children:[{type:a,value:c}]},{type:a,value:c},{type:b,tag:D,props:{src:"how-to-authorize-github-cli-2.png",alt:"GitHub CLI 認証手順 2"},children:[{type:a,value:c}]},{type:a,value:c},{type:b,tag:C,props:{id:ao},children:[{type:b,tag:h,props:{href:"#gh-%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9",ariaHidden:j,tabIndex:k},children:[{type:b,tag:d,props:{className:[l,m]},children:[]}]},{type:a,value:ap}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:b,tag:e,props:{},children:[{type:a,value:V}]},{type:a,value:" では、以下 3 つのコマンド使用方法があります（2020\u002F02\u002F17 現在）。"}]},{type:a,value:c},{type:b,tag:K,props:{},children:[{type:a,value:c},{type:b,tag:v,props:{},children:[{type:a,value:"gh pr\n"},{type:b,tag:K,props:{},children:[{type:a,value:c},{type:b,tag:v,props:{},children:[{type:a,value:"pull request 関連のコマンド"}]},{type:a,value:c}]},{type:a,value:c}]},{type:a,value:c},{type:b,tag:v,props:{},children:[{type:a,value:"gh issue\n"},{type:b,tag:K,props:{},children:[{type:a,value:c},{type:b,tag:v,props:{},children:[{type:a,value:"issue 関連のコマンド"}]},{type:a,value:c}]},{type:a,value:c}]},{type:a,value:c},{type:b,tag:v,props:{},children:[{type:a,value:"gh help\n"},{type:b,tag:K,props:{},children:[{type:a,value:c},{type:b,tag:v,props:{},children:[{type:a,value:"gh コマンドのヘルプを参照する"}]},{type:a,value:c}]},{type:a,value:c}]},{type:a,value:c}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"上記の "},{type:b,tag:e,props:{},children:[{type:a,value:O}]},{type:a,value:"、"},{type:b,tag:e,props:{},children:[{type:a,value:$}]},{type:a,value:" について詳しく紹介していきます。"}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"※以下で紹介するコマンドの使用方法は "},{type:b,tag:e,props:{},children:[{type:a,value:"gh help"}]},{type:a,value:" または、"},{type:b,tag:h,props:{href:aE,rel:[w,x,y],target:z},children:[{type:a,value:"Manual | GitHub CLI Beta"}]},{type:a,value:" にて確認することができます。"}]},{type:a,value:c},{type:b,tag:C,props:{id:aq},children:[{type:b,tag:h,props:{href:"#gh-pr---pull-request-%E9%96%A2%E9%80%A3",ariaHidden:j,tabIndex:k},children:[{type:b,tag:d,props:{className:[l,m]},children:[]}]},{type:b,tag:e,props:{},children:[{type:a,value:O}]},{type:a,value:" - Pull Request 関連"}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:b,tag:e,props:{},children:[{type:a,value:O}]},{type:a,value:" コマンドは以下の書式で実行します。"}]},{type:a,value:c},{type:b,tag:p,props:{className:[q]},children:[{type:b,tag:r,props:{className:[s,t]},children:[{type:b,tag:e,props:{},children:[{type:a,value:H},{type:b,tag:d,props:{className:[g,A]},children:[{type:a,value:I}]},{type:a,value:X},{type:b,tag:d,props:{className:[g,o]},children:[{type:a,value:L}]},{type:a,value:aF},{type:b,tag:d,props:{className:[g,o]},children:[{type:a,value:M}]},{type:a,value:X},{type:b,tag:d,props:{className:[g,o]},children:[{type:a,value:L}]},{type:a,value:P},{type:b,tag:d,props:{className:[g,o]},children:[{type:a,value:M}]},{type:a,value:c}]}]}]},{type:a,value:c},{type:b,tag:G,props:{id:ar},children:[{type:b,tag:h,props:{href:"#gh-pr-create-subcommand",ariaHidden:j,tabIndex:k},children:[{type:b,tag:d,props:{className:[l,m]},children:[]}]},{type:a,value:as}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"プルリクエストを作成します。"}]},{type:a,value:"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"},{type:b,tag:aa,props:{},children:[{type:b,tag:ab,props:{},children:[{type:b,tag:u,props:{},children:[{type:b,tag:N,props:{align:i},children:[{type:a,value:P}]},{type:b,tag:N,props:{align:i},children:[{type:a,value:ac}]}]}]},{type:b,tag:ad,props:{},children:[{type:b,tag:u,props:{},children:[{type:b,tag:n,props:{align:i},children:[{type:a,value:"-B または --base"}]},{type:b,tag:n,props:{align:i},children:[{type:a,value:"マージ対象のブランチを指定 [ "},{type:b,tag:e,props:{},children:[{type:a,value:"gh pr create -B ブランチ名"}]},{type:a,value:E}]}]},{type:b,tag:u,props:{},children:[{type:b,tag:n,props:{align:i},children:[{type:a,value:"-b または --body"}]},{type:b,tag:n,props:{align:i},children:[{type:a,value:"プルリクエストの内容を指定 [ "},{type:b,tag:e,props:{},children:[{type:a,value:"gh pr create -b 内容"}]},{type:a,value:E}]}]},{type:b,tag:u,props:{},children:[{type:b,tag:n,props:{align:i},children:[{type:a,value:"-d または --draft"}]},{type:b,tag:n,props:{align:i},children:[{type:a,value:"ドラフトとしてプルリクエストを作成 [ "},{type:b,tag:e,props:{},children:[{type:a,value:"gh pr create -d"}]},{type:a,value:E}]}]},{type:b,tag:u,props:{},children:[{type:b,tag:n,props:{align:i},children:[{type:a,value:"-t または --title"}]},{type:b,tag:n,props:{align:i},children:[{type:a,value:"プルリクエストのタイトルを指定 [ "},{type:b,tag:e,props:{},children:[{type:a,value:"gh pr create -t タイトル"}]},{type:a,value:E}]}]},{type:b,tag:u,props:{},children:[{type:b,tag:n,props:{align:i},children:[{type:a,value:"-w または --web"}]},{type:b,tag:n,props:{align:i},children:[{type:a,value:"ブラウザで GitHub のプルリクエスト画面を開く [ "},{type:b,tag:e,props:{},children:[{type:a,value:"gh pr create -w"}]},{type:a,value:E}]}]}]}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:b,tag:e,props:{},children:[{type:a,value:aG}]},{type:a,value:" で実行すると、任意のエディター上で、対話式で上記オプションを指定していくことができます。"}]},{type:a,value:c},{type:b,tag:Q,props:{id:"gh-pr-create-の実行例"},children:[{type:b,tag:h,props:{href:"#gh-pr-create-%E3%81%AE%E5%AE%9F%E8%A1%8C%E4%BE%8B",ariaHidden:j,tabIndex:k},children:[{type:b,tag:d,props:{className:[l,m]},children:[]}]},{type:b,tag:e,props:{},children:[{type:a,value:aG}]},{type:a,value:" の実行例"}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"まずコマンドを実行すると、プルリクエストの概要が表示されます。"}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:b,tag:e,props:{},children:[{type:a,value:"-B"}]},{type:a,value:" オプションをつけていないので、マージ対象のブランチはデフォルトブランチになります。"}]},{type:a,value:c},{type:b,tag:p,props:{className:[q]},children:[{type:b,tag:r,props:{className:[s,t]},children:[{type:b,tag:e,props:{},children:[{type:a,value:H},{type:b,tag:d,props:{className:[g,A]},children:[{type:a,value:I}]},{type:a,value:" create\n\nCreating pull request "},{type:b,tag:d,props:{className:[g,J]},children:[{type:a,value:aH}]},{type:a,value:" ブランチ名 into マージ対象のブランチ名 "},{type:b,tag:d,props:{className:[g,J]},children:[{type:a,value:W}]},{type:a,value:" リポジトリ名\n"}]}]}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"最初にタイトルの入力を要求されますので、そのまま入力します。"}]},{type:a,value:c},{type:b,tag:p,props:{className:[q]},children:[{type:b,tag:r,props:{className:[s,t]},children:[{type:b,tag:e,props:{},children:[{type:a,value:"? Title タイトルを入力\n"}]}]}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"次に内容欄の入力を要求されます。"}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"ここでは、"},{type:b,tag:e,props:{},children:[{type:a,value:aI}]},{type:a,value:" キーを押下して、テキストエディタを起動します。"}]},{type:a,value:c},{type:b,tag:p,props:{className:[q]},children:[{type:b,tag:r,props:{className:[s,t]},children:[{type:b,tag:e,props:{},children:[{type:a,value:aJ},{type:b,tag:d,props:{className:[g,o]},children:[{type:a,value:L}]},{type:b,tag:d,props:{className:[g,o]},children:[{type:a,value:"("}]},{type:a,value:aI},{type:b,tag:d,props:{className:[g,o]},children:[{type:a,value:")"}]},{type:a,value:" to launch notepad, enter to skip"},{type:b,tag:d,props:{className:[g,o]},children:[{type:a,value:M}]},{type:a,value:c}]}]}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"内容を入力し、テキストエディタを閉じると、以下のように表示されます。"}]},{type:a,value:c},{type:b,tag:p,props:{className:[q]},children:[{type:b,tag:r,props:{className:[s,t]},children:[{type:b,tag:e,props:{},children:[{type:a,value:aJ},{type:b,tag:d,props:{className:[g,ae]},children:[{type:a,value:"\u003C"}]},{type:a,value:"Received"},{type:b,tag:d,props:{className:[g,ae]},children:[{type:a,value:af}]},{type:a,value:c}]}]}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"最後に、「ブラウザで確認するか」「Submit するか」「キャンセルするか」を問われます。"}]},{type:a,value:c},{type:b,tag:p,props:{className:[q]},children:[{type:b,tag:r,props:{className:[s,t]},children:[{type:b,tag:e,props:{},children:[{type:a,value:"? What's next?  "},{type:b,tag:d,props:{className:[g,o]},children:[{type:a,value:L}]},{type:a,value:"Use arrows to move, "},{type:b,tag:d,props:{className:[g,"builtin","class-name"]},children:[{type:a,value:"type"}]},{type:a,value:" to filter"},{type:b,tag:d,props:{className:[g,o]},children:[{type:a,value:M}]},{type:a,value:c},{type:b,tag:d,props:{className:[g,ae]},children:[{type:a,value:af}]},{type:a,value:" Preview "},{type:b,tag:d,props:{className:[g,J]},children:[{type:a,value:W}]},{type:a,value:" browser\n  Submit\n  Cancel\n"}]}]}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"矢印キーでカーソルマーク "},{type:b,tag:e,props:{},children:[{type:a,value:af}]},{type:a,value:" を移動し、"},{type:b,tag:e,props:{},children:[{type:a,value:aD}]},{type:a,value:" で確定しましょう。"}]},{type:a,value:c},{type:b,tag:G,props:{id:at},children:[{type:b,tag:h,props:{href:"#gh-pr-status",ariaHidden:j,tabIndex:k},children:[{type:b,tag:d,props:{className:[l,m]},children:[]}]},{type:a,value:au}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"プルリクエストのステータスを表示します。"}]},{type:a,value:c},{type:b,tag:Q,props:{id:aK},children:[{type:b,tag:h,props:{href:"#%E5%85%A5%E5%8A%9B",ariaHidden:j,tabIndex:k},children:[{type:b,tag:d,props:{className:[l,m]},children:[]}]},{type:a,value:aK}]},{type:a,value:c},{type:b,tag:p,props:{className:[q]},children:[{type:b,tag:r,props:{className:[s,t]},children:[{type:b,tag:e,props:{},children:[{type:a,value:H},{type:b,tag:d,props:{className:[g,A]},children:[{type:a,value:I}]},{type:a,value:" status\n"}]}]}]},{type:a,value:c},{type:b,tag:Q,props:{id:aL},children:[{type:b,tag:h,props:{href:"#%E7%B5%90%E6%9E%9C",ariaHidden:j,tabIndex:k},children:[{type:b,tag:d,props:{className:[l,m]},children:[]}]},{type:a,value:aL}]},{type:a,value:c},{type:b,tag:p,props:{className:[q]},children:[{type:b,tag:r,props:{className:[s,t]},children:[{type:b,tag:e,props:{},children:[{type:a,value:"Relevant pull requests "},{type:b,tag:d,props:{className:[g,J]},children:[{type:a,value:W}]},{type:a,value:" リポジトリ名\n\nCurrent branch\n  カレントブランチの PR 情報\n\nCreated by you\n  自分が作成した PR 情報\n\nRequesting a code review from you\n  レビュー依頼されている PR の情報\n"}]}]}]},{type:a,value:c},{type:b,tag:G,props:{id:av},children:[{type:b,tag:h,props:{href:"#gh-pr-list-subcommand",ariaHidden:j,tabIndex:k},children:[{type:b,tag:d,props:{className:[l,m]},children:[]}]},{type:a,value:aw}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"プルリクエストの一覧を表示します。"}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"[subcommand] を指定することで、フィルタリングすることができます。"}]},{type:a,value:"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"},{type:b,tag:aa,props:{},children:[{type:b,tag:ab,props:{},children:[{type:b,tag:u,props:{},children:[{type:b,tag:N,props:{align:i},children:[{type:a,value:P}]},{type:b,tag:N,props:{align:i},children:[{type:a,value:ac}]}]}]},{type:b,tag:ad,props:{},children:[{type:b,tag:u,props:{},children:[{type:b,tag:n,props:{align:i},children:[{type:a,value:"-a または --assignee"}]},{type:b,tag:n,props:{align:i},children:[{type:a,value:"アサインされた人でフィルタリング [ "},{type:b,tag:e,props:{},children:[{type:a,value:"gh pr list -a 名前"}]},{type:a,value:E}]}]},{type:b,tag:u,props:{},children:[{type:b,tag:n,props:{align:i},children:[{type:a,value:"-l または --label"}]},{type:b,tag:n,props:{align:i},children:[{type:a,value:"ラベルでフィルタリング [ "},{type:b,tag:e,props:{},children:[{type:a,value:"gh pr list -l ラベル名"}]},{type:a,value:E}]}]},{type:b,tag:u,props:{},children:[{type:b,tag:n,props:{align:i},children:[{type:a,value:"-L または --limit"}]},{type:b,tag:n,props:{align:i},children:[{type:a,value:"表示件数の指定 [ "},{type:b,tag:e,props:{},children:[{type:a,value:"gh pr list -L 整数 [ 10 など ]"}]},{type:a,value:E}]}]},{type:b,tag:u,props:{},children:[{type:b,tag:n,props:{align:i},children:[{type:a,value:"-s または --state"}]},{type:b,tag:n,props:{align:i},children:[{type:a,value:"open, clesed, merged, all のいずれかでフィルタリング"}]}]}]}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:b,tag:e,props:{},children:[{type:a,value:"gh pr list"}]},{type:a,value:" = "},{type:b,tag:e,props:{},children:[{type:a,value:"gh pr list -s open"}]},{type:a,value:" になります。"}]},{type:a,value:c},{type:b,tag:Q,props:{id:aM},children:[{type:b,tag:h,props:{href:"#%E5%85%A5%E5%8A%9B%E4%BE%8B",ariaHidden:j,tabIndex:k},children:[{type:b,tag:d,props:{className:[l,m]},children:[]}]},{type:a,value:aM}]},{type:a,value:c},{type:b,tag:p,props:{className:[q]},children:[{type:b,tag:r,props:{className:[s,t]},children:[{type:b,tag:e,props:{},children:[{type:a,value:H},{type:b,tag:d,props:{className:[g,A]},children:[{type:a,value:I}]},{type:a,value:" list -s all\n"}]}]}]},{type:a,value:c},{type:b,tag:Q,props:{id:aN},children:[{type:b,tag:h,props:{href:"#%E5%87%BA%E5%8A%9B%E4%BE%8B",ariaHidden:j,tabIndex:k},children:[{type:b,tag:d,props:{className:[l,m]},children:[]}]},{type:a,value:aN}]},{type:a,value:c},{type:b,tag:p,props:{className:[q]},children:[{type:b,tag:r,props:{className:[s,t]},children:[{type:b,tag:e,props:{},children:[{type:a,value:"Pull requests "},{type:b,tag:d,props:{className:[g,J]},children:[{type:a,value:aH}]},{type:a,value:" リポジトリ名\n\n"},{type:b,tag:d,props:{className:[g,Y]},children:[{type:a,value:"#4 .."}]},{type:a,value:c},{type:b,tag:d,props:{className:[g,Y]},children:[{type:a,value:"#3 ...."}]},{type:a,value:c},{type:b,tag:d,props:{className:[g,Y]},children:[{type:a,value:"#2 プルリクエスト #2 のタイトル"}]},{type:a,value:c},{type:b,tag:d,props:{className:[g,Y]},children:[{type:a,value:"#1 プルリクエスト #1 のタイトル"}]},{type:a,value:c}]}]}]},{type:a,value:c},{type:b,tag:G,props:{id:ax},children:[{type:b,tag:h,props:{href:"#gh-pr-view--number--url--branch--subcommand",ariaHidden:j,tabIndex:k},children:[{type:b,tag:d,props:{className:[l,m]},children:[]}]},{type:a,value:ay}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"指定されたプルリクエストをブラウザ、またはターミナル上で表示します。"}]},{type:a,value:c},{type:b,tag:K,props:{},children:[{type:a,value:c},{type:b,tag:v,props:{},children:[{type:a,value:aO},{type:b,tag:e,props:{},children:[{type:a,value:aP}]},{type:a,value:aQ}]},{type:a,value:c},{type:b,tag:v,props:{},children:[{type:a,value:aR}]},{type:a,value:c},{type:b,tag:v,props:{},children:[{type:a,value:aS}]},{type:a,value:c}]},{type:a,value:"\n\n\n\n\n\n\n\n\n\n\n\n\n\n"},{type:b,tag:aa,props:{},children:[{type:b,tag:ab,props:{},children:[{type:b,tag:u,props:{},children:[{type:b,tag:N,props:{align:i},children:[{type:a,value:P}]},{type:b,tag:N,props:{align:i},children:[{type:a,value:ac}]}]}]},{type:b,tag:ad,props:{},children:[{type:b,tag:u,props:{},children:[{type:b,tag:n,props:{align:i},children:[{type:a,value:"-p または --preview"}]},{type:b,tag:n,props:{align:i},children:[{type:a,value:"コマンド上でプルリクエスト内容のプレビューを行う（"},{type:b,tag:e,props:{},children:[{type:a,value:"fzf"}]},{type:a,value:" のような他の CLI ツールとも連携できるようです）"}]}]}]}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:b,tag:e,props:{},children:[{type:a,value:"-p"}]},{type:a,value:" オプションを使わなければ、ブラウザで表示されます。"}]},{type:a,value:c},{type:b,tag:G,props:{id:az},children:[{type:b,tag:h,props:{href:"#gh-pr-checkout--number--url--branch-",ariaHidden:j,tabIndex:k},children:[{type:b,tag:d,props:{className:[l,m]},children:[]}]},{type:a,value:aA}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"指定されたプルリクエストの branch に checkout します。"}]},{type:a,value:c},{type:b,tag:K,props:{},children:[{type:a,value:c},{type:b,tag:v,props:{},children:[{type:a,value:aO},{type:b,tag:e,props:{},children:[{type:a,value:aP}]},{type:a,value:aQ}]},{type:a,value:c},{type:b,tag:v,props:{},children:[{type:a,value:aR}]},{type:a,value:c},{type:b,tag:v,props:{},children:[{type:a,value:aS}]},{type:a,value:c}]},{type:a,value:c},{type:b,tag:C,props:{id:aB},children:[{type:b,tag:h,props:{href:"#gh-issue---issue-%E9%96%A2%E9%80%A3",ariaHidden:j,tabIndex:k},children:[{type:b,tag:d,props:{className:[l,m]},children:[]}]},{type:b,tag:e,props:{},children:[{type:a,value:$}]},{type:a,value:" - issue 関連"}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:b,tag:e,props:{},children:[{type:a,value:$}]},{type:a,value:" コマンドは "},{type:b,tag:e,props:{},children:[{type:a,value:O}]},{type:a,value:" と同じく、以下の書式で実行します。"}]},{type:a,value:c},{type:b,tag:p,props:{className:[q]},children:[{type:b,tag:r,props:{className:[s,t]},children:[{type:b,tag:e,props:{},children:[{type:a,value:H},{type:b,tag:d,props:{className:[g,A]},children:[{type:a,value:I}]},{type:a,value:X},{type:b,tag:d,props:{className:[g,o]},children:[{type:a,value:L}]},{type:a,value:aF},{type:b,tag:d,props:{className:[g,o]},children:[{type:a,value:M}]},{type:a,value:X},{type:b,tag:d,props:{className:[g,o]},children:[{type:a,value:L}]},{type:a,value:P},{type:b,tag:d,props:{className:[g,o]},children:[{type:a,value:M}]},{type:a,value:c}]}]}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"各種オプション、サブコマンドの効果も "},{type:b,tag:e,props:{},children:[{type:a,value:O}]},{type:a,value:" と同じです。"}]},{type:a,value:c},{type:b,tag:C,props:{id:S},children:[{type:b,tag:h,props:{href:"#%E9%9B%91%E6%84%9F",ariaHidden:j,tabIndex:k},children:[{type:b,tag:d,props:{className:[l,m]},children:[]}]},{type:a,value:S}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"2 年ほど前から Git を使用し始めた筆者ですが、"},{type:b,tag:_,props:{},children:[{type:a,value:"Git 操作についてはコマンド"}]},{type:a,value:"で（"},{type:b,tag:e,props:{},children:[{type:a,value:"VSCode"}]},{type:a,value:" のターミナルを使用）、"},{type:b,tag:_,props:{},children:[{type:a,value:"GitHub 操作については GitHub Desktop"}]},{type:a,value:"で行っていました。"}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:b,tag:h,props:{href:"https:\u002F\u002Fdesktop.github.com\u002F",rel:[w,x,y],target:z},children:[{type:a,value:"GitHub Desktop"}]},{type:a,value:"は、グラフィカルに Git の操作ができて大変便利なのですが、マウス操作ベースなので CLI に比べて手間がかかり、ストレスに感じていました。"}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"そこで "},{type:b,tag:e,props:{},children:[{type:a,value:aT}]},{type:a,value:" を導入して、ターミナル上で操作できるようになったので、とても快適になりました。"}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:a,value:"まだ "},{type:b,tag:e,props:{},children:[{type:a,value:aT}]},{type:a,value:" は Beta 版で、"},{type:b,tag:e,props:{},children:[{type:a,value:U}]},{type:a,value:" と比べると機能が劣っているように感じる点もありますが、今後の発展が大いに期待できるのでぜひ使ってみてください！"}]},{type:a,value:c},{type:b,tag:C,props:{id:T},children:[{type:b,tag:h,props:{href:"#%E5%8F%82%E8%80%83%E3%82%B5%E3%82%A4%E3%83%88",ariaHidden:j,tabIndex:k},children:[{type:b,tag:d,props:{className:[l,m]},children:[]}]},{type:a,value:T}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:b,tag:h,props:{href:aE,rel:[w,x,y],target:z},children:[{type:a,value:"Manual - GitHub CLI Beta"}]}]},{type:a,value:c},{type:b,tag:f,props:{},children:[{type:b,tag:h,props:{href:"https:\u002F\u002Fgithub.blog\u002F2020-02-12-supercharge-your-command-line-experience-github-cli-is-now-in-beta\u002F?utm_campaign=1581528372&utm_medium=social&utm_source=facebook,linkedin,twitter&utm_content=1581528372",rel:[w,x,y],target:z},children:[{type:a,value:"Supercharge your command line experience: GitHub CLI is now in beta - The GitHub Blog"}]}]}]},dir:"\u002Fja\u002Fothers\u002Fgit",path:"\u002Fja\u002Fothers\u002Fgit\u002Fhow-to-use-github-cli-for-windows",extension:".md",to:"\u002Fothers\u002Fgit\u002Fhow-to-use-github-cli-for-windows",category:"others\u002Fgit"},prev:{slug:"nuxt-stylelint-prettier-vscode-format-scss-on-save",title:"Nuxt + Stylelint + Prettier + VSCode で、保存時に SCSS を自動フォーマットする",thumbnail:Z,to:"\u002Fweb\u002Fnuxtjs\u002Fnuxt-stylelint-prettier-vscode-format-scss-on-save"},next:{slug:"how-to-develop-tyranoscript-ver5-tyranostudio",title:"TyranoScript Ver 5.00 と TyranoStudio でノベルゲーム開発！",thumbnail:Z,to:"\u002Fgamedev\u002Ftyranoscript\u002Fhow-to-develop-tyranoscript-ver5-tyranostudio"},_img:{"/_ipx/assets/others/git/how-to-use-github-cli-for-windows/eyecatch.png?w=1280":"d50ccc.png","/_ipx/assets/others/git/how-to-use-github-cli-for-windows/how-to-install-github-cli-1.png":"ef06a8.png","/_ipx/assets/others/git/how-to-use-github-cli-for-windows/how-to-install-github-cli-2.png":"5da476.png","/_ipx/assets/others/git/how-to-use-github-cli-for-windows/how-to-install-github-cli-3.png":"f63081.png","/_ipx/assets/others/git/how-to-use-github-cli-for-windows/how-to-install-github-cli-4.png":"fca2d0.png","/_ipx/assets/others/git/how-to-use-github-cli-for-windows/how-to-install-github-cli-5.png":"540c59.png","/_ipx/assets/others/git/how-to-use-github-cli-for-windows/how-to-install-github-cli-6.png":"a56565.png","/_ipx/assets/others/git/how-to-use-github-cli-for-windows/how-to-authorize-github-cli-1.png":"3d20b8.png","/_ipx/assets/others/git/how-to-use-github-cli-for-windows/how-to-authorize-github-cli-2.png":"ec3067.png","/_ipx/assets/web/nuxtjs/nuxt-stylelint-prettier-vscode-format-scss-on-save/eyecatch.png?w=1280":"678ab4.png","/_ipx/assets/gamedev/tyranoscript/how-to-develop-tyranoscript-ver5-tyranostudio/eyecatch.png?w=1280":"fb9daf.png"}}],fetch:[],mutations:[]}}("text","element","\n","span","code","p","token","a","left","true",-1,"icon","icon-link","td","punctuation","div","nuxt-content-highlight","pre","language-bash","line-numbers","tr","li","nofollow","noopener","noreferrer","_blank","function",2,"h2","img-in-post"," ]",3,"h3","gh ","pr","keyword","ul","[","]","th","gh pr","subcommand","h4","インストーラーを利用する方法","雑感","参考サイト","hub","gh","in"," ","comment","eyecatch.png","strong","gh issue","table","thead","概要","tbody","operator","\u003E","github-cli-とは","GitHub CLI とは","windows-でのインストール方法","Windows でのインストール方法","scoop-を利用する方法","Scoop を利用する方法","github-cli-の認証","GitHub CLI の認証","gh-コマンドの使い方","gh コマンドの使い方","gh-pr---pull-request-関連","gh-pr-create-subcommand","gh pr create [subcommand]","gh-pr-status","gh pr status","gh-pr-list-subcommand","gh pr list [subcommand]","gh-pr-view--number--url--branch--subcommand","gh pr view { \u003Cnumber\u003E | \u003Curl\u003E | \u003Cbranch\u003E } [subcommand]","gh-pr-checkout--number--url--branch-","gh pr checkout { \u003Cnumber\u003E | \u003Curl\u003E | \u003Cbranch\u003E }","gh-issue---issue-関連","https:\u002F\u002Fcli.github.com\u002F","Enter","https:\u002F\u002Fcli.github.com\u002Fmanual\u002F","status, list, view, checkout, create","gh pr create","for","e","? Body ","入力","結果","入力例","出力例","\u003Cnumber\u003E : #1, 2, 3 のようなプルリクエストに割り当てられる番号で指定（","#"," は不要）","\u003Curl\u003E : プルリクエストページの URL で指定","\u003Cbranch\u003E : ブランチ名で指定","GitHub CLI")));