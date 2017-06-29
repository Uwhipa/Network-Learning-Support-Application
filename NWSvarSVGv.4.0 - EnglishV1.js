/* version4.0
  Designed by Ms. Chiaki Kawanishi
  Translated by M. Lorkan Sauvion
*/

/*
TODO: Explications plus détaillés sur le fonctionnement du simulateur (table d'addressage)
Espagnol

*/

var M=new Array(12);  // 盤面情報配列
var IP;               // IPアドレス
var cnt;
var pos=new Array(2);
var flag=-1;          // スイッチフラグ
var A=new Array(100);  // オブジェクトのつながり
var IPad=new Array(100); // オブジェクトの位置とIPアドレス
var di=0;             // 線の本数
var obj=0;            // オブジェクト数
var source;           // 送信元
var destine;          // 送信先
var ttl;              // Time To Live
var timer1;           // タイマー処理
var cflag=0;          // クリックフラグ
var line={};
var linenumber=0;     // 線識別用
var c={};
var ccount=-1;
var stepcnt=0;        // ステップカウント
var ipadview=new Array(100);  // IPアドレス表示
var onm=0;

var app = {}
app.translations = {
  en: {
      place_router:"Please click where you want to place the router.",
      place_host:"Please click where you want to place the host.",
      choose_start:"Please select a start point.",
      alert_connection:"At least 2 hosts must be connected to the network.",
      choose_sender:"Please select a sender.",
      choose_sender_click:"Please choose a sender.",
      choose_destination:"Please select a receiver.",
      confirm:"Confirm",
      choose_destination_click:"Please choose a receiver.",
      same_sender_and_receiver:"Source and destination are the same.",
      destination_address:"Destination : ",
      hover:"When you hover the cursor over an object, it displays the IP address of that object.",
      quick_speed:"Fast",
      medium_speed:"Normal",
      slow_speed:"Slow",
      start:"Start",
      step_by_step:"Step By Step",
      add:"Add",
      router:"Router",
      host:"Host",
      path:'Path',
      choose_end:"Please select an end point.",
      clear:"Clear",
      destination_network:"Destination Network",
      interface:"Interface",
      nexthop:"Next Hop",
      metric:"Distance",
      top:"Top ",
      bottom:"Bottom ",
      right:"Right",
      left:"Left",
      help:"Help",
      intro:"This program can simulate the operation of a network, in particular the sending of packets from one host to another via routers.",
      intro_router:"Use this button to add a router to the current network.",
      intro_host:"Use this button to add a host to the current network.",
      intro_path:"Use this button to link two objects to each other. Warning: a host can only be linked to one object !",
      intro_confirm:"Once your network is complete, click here to continue.",
      intro_clear:"Use this button to delete the current network.",
      intro_help:"Use this button to see this presentation again.",
      intro_language:"Use this drop down menu to change the language of this software.",
      cancel:"Back",
      intro_step2:"Select the sending host, and then tap Confirm. Then select the receiving host, and then tap Confirm. You can return to the previous screen by pressing Back.",
      intro_start:"Use this button to start the full animated simulation.",
      intro_step:"Use this button to start animated simulation in step-by-step mode.",
      intro_add:"Use this button to return to the network creation screen.",
      intro_speed:"Use this drop-down menu to change the speed of the animation.",
      intro_step3:"Now that the network is configured, the program will be able to launch an animated simulation of the path traversed by a packet between two hosts.",

  }
  ,ja:{
      place_router:"ルータを配置したい場所をクリックしてください。",
      place_host:"ホストを配置したい場所をクリックしてください。",
      choose_start:"始点を選択してください。",
      alert_connection:"ネットワークにつながっているホストが2 以下です。",
      choose_sender:"発信元を選んでください。",
      choose_sender_click:"送信者を選択してください。",
      choose_destination:"送信先を選んでください。",
      confirm:"確定",
      choose_destination_click:"受信機を選択してください。",
      same_sender_and_receiver:"発信元と送信先が同じです。",
      destination_address:"送信先アドレス : ",
      hover:"カーソルをオブジェクトの上に合わせると、そのオブジェクトが持つIPアドレスを表示します。",
      quick_speed:"高速",
      medium_speed:"中速",
      slow_speed:"低速",
      start:"スタート",
      step_by_step:"詳しく",
      add:"追加",
      router:"ルータ",
      host:"ホスト",
      path:"経路",
      choose_end:"終点を選択してください。",
      clear:"クリア",
      destination_network:"宛先ネットワーク",
      interface:"インタフェース",
      nexthop:"ネクストホップ",
      metric:"距離",
      top:"上",
      down:"下",
      right:"右",
      left:"左",
      help:"手助け",
      intro:"このプログラムは、ネットワークの動作をシミュレートすることができます。特に、ルータを経由してあるホストから別のホストにパケットを送信します。",
      intro_router:"このボタンを使用して、現在のネットワークにルータを追加します。",
      intro_host:"このボタンを使用して、現在のネットワークにホストを追加します。",
      intro_path:"このボタンを使用して、2つのオブジェクトを相互にリンクします。 警告：ホストは1つのオブジェクトにしかリンクできません！",
      intro_confirm:"ネットワークが完成したら、ここをクリックして続行してください。",
      intro_clear:"このボタンを使用して現在のネットワークを削除します。",
      intro_help:"このプレゼンテーションを再度表示するには、このボタンを使用します。",
      intro_language:"このドロップダウンメニューを使用して、このソフトウェアの言語を変更します。",
      cancel:"バック",
      intro_step2:"送信ホストを選択し、[確定]をタップします。 その後、受信ホストを選択し、[確定]をタップします。 [バック]をタップすると、前の画面に戻ることができます。",
      intro_start:"このボタンを使用して、完全なアニメーションシミュレーションを開始します。",
      intro_step:"ステップバイステップモードでアニメーションシミュレーションを開始するには、このボタンを使用します。",
      intro_add:"このボタンを使用してネットワーク作成画面に戻ります。",
      intro_speed:"このドロップダウンメニューを使用してアニメーションの速度を変更する。",
      intro_step3:"ネットワークが設定されたので、プログラムは、2つのホスト間のパケットが通過するパスのアニメーションシミュレーションを起動できます。",

  }
  ,fr:{
      place_router:"Veuillez cliquer à l'endroit où vous désirez placer le routeur.",
      place_host:"Veuillez cliquer à l'endroit où vous désirez placer l'hôte.",
      choose_start:"Veuillez choisir un point de départ.",
      alert_connection:"Il n'existe pas au moins 2 hôtes connectés au réseau.",
      choose_sender:"Veuillez sélectionner un émetteur.",
      choose_sender_click:"Veuillez choisir un émetteur.",
      choose_destination:"Veuillez sélectionner un récepteur.",
      confirm:"Confirmer",
      choose_destination_click:"Veuillez choisir un récepteur.",
      same_sender_and_receiver:"La source et la destination sont identiques.",
      destination_address:"Destinataire : ",
      hover:"Lorsque vous passez le curseur devant un objet, l'adresse IP de cet objet s'affiche.",
      quick_speed:"Rapide",
      medium_speed:"Moyen",
      slow_speed:"Lent",
      start:"Démarrer",
      step_by_step:"Étape par étape",
      add:"Ajout",
      router:"Routeur",
      host:"Hôte",
      path:"Chemin",
      choose_end:"Veuillez choisir un point d'arrivée.",
      clear:"Effacer",
      destination_network:"Réseau de destination",
      interface:"Interface",
      nexthop:"Saut suivant",
      metric:"Distance",
      top:"En haut ",
      bottom:"En bas ",
      right:"à droite",
      left:"à gauche",
      help:"Aide",
      intro:"Ce programme permet de simuler le fonctionnement d'un réseau, en particulier l'envoi de paquets d'un hôte à un autre via des routeurs.",
      intro_router:"Utilisez ce bouton pour ajouter un routeur au réseau actuel.",
      intro_host:"Utilisez ce bouton pour ajouter un hôte au réseau actuel.",
      intro_path:"Utilisez ce bouton pour relier deux éléments entre eux. Attention : un hôte ne peut pas être lié à plus d'un routeur !",
      intro_confirm:"Une fois que votre réseau est terminé, cliquez ici pour continuer.",
      intro_clear:"Utilisez ce bouton pour supprimer le réseau actuel.",
      intro_help:"Utilisez ce bouton pour revoir cette présentation.",
      intro_language:"Utilisez ce menu déroulant pour changer la langue d'affichage.",
      cancel:"Retour",
      intro_step2:"Sélectionnez l'hôte émetteur, puis appuyez sur Confirmer. Puis sélectionnez l'hôte récepteur, puis appuyez sur Confirmer. Vous pouvez retourner sur l'écran précédent en appuyant sur Retour.",
      intro_start:"Utilisez ce bouton pour lancer la simulation animée complète.",
      intro_step:"Utilisez ce bouton pour lancer la simulation animée en mode étape par étape.",
      intro_add:"Utilisez ce bouton pour revenir à l'écran de création du réseau.",
      intro_speed:"Utilisez ce menu déroulant pour changer la vitesse de l'animation.",
      intro_step3:"Maintenant que le réseau est configuré, le programme va pouvoir lancer une simulation animée du trajet parcouru par un paquet entre deux hôtes.",
  },
  pt:
  {
    place_router:"Por favor, clique em onde você deseja colocar o roteador.",
    place_host:"Por favor, clique em onde deseja colocar o host.",
    choose_start:"Selecione um ponto inicial.",
    alert_connection:"Pelo menos 2 hosts devem estar conectados à rede.",
    choose_sender:"Selecione um remetente.",
    choose_sender_click:"Escolha um remetente.",
    choose_destination:"Selecione um receptor.",
    confirm:"Confirmar",
    choose_destination_click:"Escolha um receptor.",
    same_sender_and_receiver:"Origem e destino são os mesmos.",
    destination_address:"Destino : ",
    hover:"Quando você passa o mouse sobre um objeto, ele exibe o endereço IP desse objeto.",
    quick_speed:"Rápido",
    medium_speed:"Normal",
    slow_speed:"Lento",
    start:"Começar",
    step_by_step:"Passo a passo",
    add:"Adicionar",
    router:"Roteador",
    host:"Hospedeiro",
    path:'Caminho',
    choose_end:"Selecione um ponto final.",
    clear:"Claro",
    destination_network:"Rede de destino",
    interface:"Interface",
    nexthop:"Próximo salto",
    metric:"Distância",
    top:"Em cima ",
    bottom:"Para baixo ",
    right:"Na direita",
    left:"Na esquerda",
    help:"Ajuda",
    intro:"Este programa pode simular a operação de uma rede, em particular o envio de pacotes de um host para outro através de roteadores.",
    intro_router:"Use este botão para adicionar um roteador à rede atual.",
    intro_host:"Use este botão para adicionar um host à rede atual.",
    intro_path:"Use este botão para vincular dois objetos um ao outro. Aviso: um host só pode ser vinculado a um objeto!",
    intro_confirm:"Uma vez que sua rede esteja completa, clique aqui para continuar.",
    intro_clear:"Use este botão para excluir a rede atual.",
    intro_help:"Use este botão para ver esta apresentação novamente.",
    intro_language:"Use este menu suspenso para alterar o idioma deste software.",
    cancel:"Retorno",
    intro_step2:"Selecione o host de envio e, em seguida, toque em Confirmar. Em seguida, selecione o host de recebimento e depois toque em Confirmar. Você pode voltar à tela anterior pressionando Retorno.",
    intro_start:"Use este botão para iniciar a simulação animada completa.",
    intro_step:"Use este botão para iniciar a simulação animada no modo passo a passo.",
    intro_add:"Use este botão para retornar à tela de criação de rede.",
    intro_speed:"Use este menu suspenso para alterar a velocidade da animação.",

  }
};

var currentLanguage = document.documentElement.lang || "en";

function help(){
  var introJS = introJs();
  introJS.setOptions({
    steps: [
      {
        intro:getText("intro")
      },
      {
        element: '#router-button',
        intro:getText("intro_router")
      },
      {
        element: '#host-button',
        intro:getText("intro_host")
      },
      {
        element: '#path-button',
        intro:getText("intro_path")
      },
      {
        element: '#confirm-button',
        intro:getText("intro_confirm")
      },
      {
        element: '#clear-button',
        intro:getText("intro_clear")
      },
      {
        element: '#help-button',
        intro:getText("intro_help")
      },
      {
        element: '#language_select',
        intro:getText("intro_language")
      }
    ]
  })
  introJS.start();
}

function help_step2(){
  var introJS = introJs();
  introJS.setOptions({
    steps:[
      {
        intro:getText("intro_step2")
      }
    ]
  })
  introJS.start();
}

function help_step3(){
  var introJS = introJs();
  introJS.setOptions({
    steps:[
      {
        intro:getText("intro_step3")
      },
      {
        element: '#start_button',
        intro:getText("intro_start")
      },
      {
        element: '#step_button',
        intro:getText("intro_step")
      },
      {
        element: '#add_button',
        intro:getText("intro_add")
      },
      {
        element:"#clear_button",
        intro:getText("intro_clear")
      },
      {
        element:"#speed_menu",
        intro:getText("intro_speed")
      },
      {
        element:"#help_button",
        intro:getText("intro_help")
      }
    ]
  })
  introJS.start();
}


function getText(key){
  return app.lang[key] || app.translations.en[key] || "{translation key not found : "+key+"}";
}

function language_change(){
  var idx = document.getElementById("language_select").selectedIndex;
  var language = document.getElementById("language_select").options[idx].value;
  currentLanguage = language;
  init();
}




function IPA(x,y){
  this.x=x;         // x座標
  this.y=y;         // y座標
}
function AD(add,linenum){
  this.add=add;     // IPアドレス
  this.lin=linenum; // 線
}
function RTT(toad,intf,hop){
  this.toad=toad;     // あて先ネットワーク
  this.intf=intf;     // インタフェース
  this.hop=hop;       // ホップ数
}

function arrayinit()  // 配列初期化関数
{
  var root1=document.getElementById('holder');
  paper = Raphael(root1);
  var root2=document.getElementById('destineIP');
  paper2 = Raphael(root2, 400, 22);

  var i,j;
  for (i=0;i<12;i++){
    M[i]=new Array(17);  // ２次元配列にする
  }
  for (i=0;i<12;i++){
    for (j=0;j<17;j++){
      M[i][j]=0;       // 初期化
    }
  }
  for (i=0;i<100;i++){
    A[i]=new Array(4);  // ２次元配列にする
  }
  for (i=0;i<100;i++){
    for (j=0;j<4;j++){
      A[i][j]=-1;     // 初期化
    }
  }
  cnt=0;
}

function clear_all()
{
  paper.clear();
  init();
  for (i=0;i<12;i++){
    for (j=0;j<17;j++){
      M[i][j]=0;       // 初期化
    }
  }
  for (i=0;i<100;i++){
    for (j=0;j<4;j++){
      A[i][j]=-1;      // 初期化
    }
  }
  cnt=0;
  line.length=0;
  c.length=0;
  IPad.length=0;
  di=0;
  obj=0;
}

/*
// 表示画面の大きさの取得（余力があれば後々利用したい）
function getBrowserWidth() {
    if ( window.innerWidth ) {
        return window.innerWidth;
    }
    else if ( document.documentElement && document.documentElement.clientWidth != 0 ) {
        return document.documentElement.clientWidth;
    }
    else if ( document.body ) {
        return document.body.clientWidth;
    }
    return 0;
}
function getBrowserHeight() {
    if ( window.innerHeight ) {
        return window.innerHeight;
    }
    else if ( document.documentElement && document.documentElement.clientHeight != 0 ) {
        return document.documentElement.clientHeight;
    }
    else if ( document.body ) {
        return document.body.clientHeight;
    }
    return 0;
}
*/

//オブジェクトが持つデータリストを作る関数
function classmake(ti,x,y,IP,mc){
  if(M[x][y]==25){
    IPad[obj]=new IPA(x,y);   // 座標
    IPad[obj].ads=new Array(1);
    IPad[obj].ads[0]=new AD(IP+((ti%2)+1),Math.floor(ti/2));
    IPad[obj].co=1;
    IPad[obj].rco=1;
    IPad[obj].tag="h";        // ホストである
    IPad[obj].dis=new Array(2);
    IPad[obj].dis[0]=new RTT(IP,0,0);
    A[0][mc++]=obj; A[0][mc]=IPad[obj].co-1;
    obj++;
  }else if(M[x][y]==15){
    for(i=0;i<obj;i++){
      if(IPad[i].x==x && IPad[i].y==y){
        IPad[i].ads[IPad[i].co]=new AD(IP+((ti%2)+1),Math.floor(ti/2));
        IPad[i].dis[IPad[i].rco]=new RTT(IP,IPad[i].co,0);
        A[0][mc++]=i; A[0][mc]=IPad[i].co;
        IPad[i].co++;
        IPad[i].rco++;
        break;
      }
    }
    if(i==obj){
      IPad[obj]=new IPA(x,y);
      IPad[obj].ads=new Array(100);
      IPad[obj].ads[0]=new AD(IP+((ti%2)+1),Math.floor(ti/2));
      IPad[obj].co=1;
      IPad[obj].rco=1;
      IPad[obj].tag="r";      // ルータである
      IPad[obj].dis=new Array(100);
      IPad[obj].dis[0]=new RTT(IP,0,0);
      A[0][mc++]=obj; A[0][mc]=IPad[obj].co-1;
      obj++;
    }
  }
}

function add1(){  // ルータボタンを押した
  flag=0;
  document.getElementById('IP_Indication').innerHTML=getText('place_router');
}

function add2(){  // ホストボタンを押した
  flag=10;
  document.getElementById('IP_Indication').innerHTML=getText('place_host');
}

function rout(){  // 経路ボタンを押した
  flag=20;
  document.getElementById('IP_Indication').innerHTML=getText('choose_start');
}

function set() {  // 確定ボタンを押した
  var i,j;
  flag=-1;
  document.getElementById('btn').innerHTML="";
  var h25=0;
  for (i=0;i<12;i++){
    for (j=0;j<17;j++){
      if(M[i][j]==25){
        h25++;
      }
    }
  }
  if(h25<2){
    alert(getText('alert_connection'));
    init();
  }else{
    // オブジェクトのデータ作成
    for(i=cnt;i<di;i++){
      addressing();
      classmake(2*i,A[i][0],A[i][1],IP,0);
// alert(IPad[obj-1].dis[IPad[obj-1].co-1].toad+"  "+IPad[obj-1].ads[IPad[obj-1].dis[IPad[obj-1].co-1].intf].ad+"  "+IPad[IPad[obj-1].dis[IPad[obj-1].co-1].nexti].ads[IPad[obj-1].dis[IPad[obj-1].co-1].nextj].ad+"  "+IPad[obj-1].dis[IPad[obj-1].co-1].hop);
// alert(IPad[obj-1].ads[IPad[obj-1].dis[IPad[obj-1].co-1].intf].slice(0,IPad[obj-1].ads[IPad[obj-1].dis[IPad[obj-1].co-1].intf].length-2));
      classmake((2*i)+1,A[i][2],A[i][3],IP,2);
// alert(IPad[obj-1].dis[IPad[obj-1].co-1].toad+"  "+IPad[obj-1].ads[IPad[obj-1].dis[IPad[obj-1].co-1].intf].ad+"  "+IPad[IPad[obj-1].dis[IPad[obj-1].co-1].nexti].ads[IPad[obj-1].dis[IPad[obj-1].co-1].nextj].ad+"  "+IPad[obj-1].dis[IPad[obj-1].co-1].hop);
      IPad[A[0][0]].ads[A[0][1]].toi=A[0][2];
      IPad[A[0][0]].ads[A[0][1]].toj=A[0][3];
      IPad[A[0][2]].ads[A[0][3]].toi=A[0][0];
      IPad[A[0][2]].ads[A[0][3]].toj=A[0][1];
    }
    cnt=di;
    // ルーティングテーブル作成（前から）
    for(i=0;i<obj;i++){
      if(IPad[i].tag=="r"){
        for(j=0;j<IPad[i].co;j++){
          var ni=IPad[i].ads[j].toi;
          if(IPad[ni].tag=="r"){
            for(k=0;k<IPad[i].rco;k++){
              for(l=0;l<IPad[ni].rco;l++){
                if((IPad[ni].dis[l].hop==0 && IPad[i].dis[k].toad==IPad[ni].dis[l].toad) || IPad[i].ads[IPad[i].dis[k].intf].toi==ni
                || (IPad[i].dis[k].toad==IPad[ni].dis[l].toad && IPad[ni].ads[IPad[ni].dis[l].intf].toi==i)){
                  break;
                }
              }
              if(l==IPad[ni].rco){
                IPad[ni].dis[IPad[ni].rco++]=new RTT(IPad[i].dis[k].toad,IPad[i].ads[j].toj,IPad[i].dis[k].hop+1);
                //確認 alert(IPad[ni].dis[IPad[ni].rco-1].toad+"  "+IPad[ni].ads[IPad[ni].dis[IPad[ni].rco-1].intf].add+"  "+IPad[IPad[ni].ads[IPad[ni].dis[IPad[ni].rco-1].intf].toi].ads[IPad[ni].ads[IPad[ni].dis[IPad[ni].rco-1].intf].toj].add+"  "+IPad[ni].dis[IPad[ni].rco-1].hop);
              }
            }
          }
        }
      }
    }
    // ルーティングテーブル作成（後ろから）
    for(i=obj-2;i>=0;i--){
      if(IPad[i].tag=="r"){
        for(j=0;j<IPad[i].co;j++){
          var ni=IPad[i].ads[j].toi;
          if(IPad[ni].tag=="r"){
            for(k=0;k<IPad[i].rco;k++){
              for(l=0;l<IPad[ni].rco;l++){
                if((IPad[ni].dis[l].hop==0 && IPad[i].dis[k].toad==IPad[ni].dis[l].toad) || IPad[i].ads[IPad[i].dis[k].intf].toi==ni
                || (IPad[i].dis[k].toad==IPad[ni].dis[l].toad && IPad[ni].ads[IPad[ni].dis[l].intf].toi==i)){
                  break;
                }
              }
              if(l==IPad[ni].rco){
                IPad[ni].dis[IPad[ni].rco++]=new RTT(IPad[i].dis[k].toad,IPad[i].ads[j].toj,IPad[i].dis[k].hop+1);
                //確認 alert(IPad[ni].dis[IPad[ni].rco-1].toad+"  "+IPad[ni].ads[IPad[ni].dis[IPad[ni].rco-1].intf].add+"  "+IPad[IPad[ni].ads[IPad[ni].dis[IPad[ni].rco-1].intf].toi].ads[IPad[ni].ads[IPad[ni].dis[IPad[ni].rco-1].intf].toj].add+"  "+IPad[ni].dis[IPad[ni].rco-1].hop);
              }
            }
          }
        }
      }
    }
/* 確認
    for(i=0;i<IPad[1].rco;i++){
      alert(IPad[1].dis[i].toad+"  "+IPad[IPad[1].ads[IPad[1].dis[i].intf].toi].ads[IPad[1].ads[IPad[1].dis[i].intf].toj].add+"  "+IPad[1].dis[i].hop);
    }
*/
    for(i=0;i<obj;i++){
      ipadview[i]=paper.set();
      for(j=0;j<IPad[i].co;j++){
        var ax,by,lxy,ex,ey;
        ax=IPad[IPad[i].ads[j].toi].y-IPad[i].y;
        by=IPad[IPad[i].ads[j].toi].x-IPad[i].x;
        lxy=Math.sqrt(Math.pow(ax,2)+Math.pow(by,2));
        ex=(IPad[IPad[i].ads[j].toi].y-IPad[i].y)/lxy;
        ey=(IPad[IPad[i].ads[j].toi].x-IPad[i].x)/lxy;
        ipadview[i].push(paper.text((IPad[i].y*50+25)+(55*ex),(IPad[i].x*50+25)+(30*ey),IPad[i].ads[j].add));
        ipadview[i].attr({"font-size":11, fill:"none", stroke: "red"});
        ipadview[i].hide();
      }
    }
    source=new IPA(-1,-1);      // 発信元の初期化
    destine=new IPA(-1,-1);     // 送信先の初期化
    originating();
  }
}

// IPアドレスの割り当て
function addressing()
{
  var i,j;
  IP="192.168."+Math.floor(Math.random()*256)+".";
  for(i=0; i<obj; i++){
    for(j=0; j<IPad[i].co; j++){
      if(IP==IPad[i].ads[j].add.slice(0,IPad[i].ads[j].add.length-1)){
        addressing();
      }
    }
  }
}

// 発信元の選択
function originating()
{
  help_step2();
  flag=30;
  document.getElementById('IP_Indication').innerHTML=getText('choose_sender');
  document.getElementById('btn').innerHTML=
  "<input type='button' value="+getText('confirm') +" onClick='destination()'>"
  +"<input type='button' value="+getText('cancel') +" onClick='init()'>";
}

// 送信先の選択
function destination()
{
  if(source.x==-1 && source.y==-1){
    alert(getText('choose_sender_click'));
    originating();
  }else{
    c[ccount].hide();
    flag=40;
    document.getElementById('IP_Indication').innerHTML=getText('choose_destination');
    document.getElementById('btn').innerHTML=
    "<input type='button' value="+getText('confirm')+" onClick='decision()'>"
    +"<input type='button' value="+getText('cancel') +" onClick='init()'>";
  }
}

// 詳しくのカウント処理
function stepc()
{
  clearInterval(timer1);
  var time=2000;
  if(stepcnt==0){
    col=0;
    ttl=16;
    now=source.i;
    x1=IPad[now].y;
    y1=IPad[now].x;
    linenumber=IPad[now].ads[0].lin;
    next=IPad[now].ads[0].toi;
    x2=IPad[next].y;
    y2=IPad[next].x;
    animation(time);
  }else if(stepcnt%3==1){
    animation(time);
  }else if(stepcnt%3==2){
    animation(time);
  }else if(stepcnt%3==0){
    animation(time);
  }
}

// アニメーション始め
function anime_start(form)
{
  clearInterval(timer1);
  if(stepcnt==0){
    line[linenumber].attr({stroke:"#000","stroke-width":1});
    c[ccount].hide();
    col=0;
    ttl=16;
    now=source.i;
    x1=IPad[now].y;
    y1=IPad[now].x;
    linenumber=IPad[now].ads[0].lin;
    next=IPad[now].ads[0].toi;
    x2=IPad[next].y;
    y2=IPad[next].x;
  }
  var index=form.speed.selectedIndex;
  var time=eval(form.speed.options[index].value);
  animation(time);
  timer1 = setInterval("animation("+time+")", time+500);
}

// アニメーション
function animation(time)
{
  if(col==0){
    paint();
    document.getElementById("ttl_count").innerHTML = "TTL:"+ttl;
    ttl--;
    col=20;
  }else if(col==10){
    if(next==destine.i){
      ccount=IPad[next].y+(15*IPad[next].x);
      c[ccount].hide();
      ipadview[next].hide();
      stepcnt=-1;
      clearInterval(timer1);
    }else if(ttl==0){
      clearInterval(timer1);
      document.getElementById("ttl_count").innerHTML = "TTL:"+ttl;
      alert("TTL expired in transit");
    }else{
      var dhop=10000;
      now=next;
      x1=IPad[now].y;
      y1=IPad[now].x;
      for(i=0; i<IPad[now].rco; i++){
        if(IPad[now].dis[i].toad == destine.ad){
          if(dhop>IPad[now].dis[i].hop){
            linenumber=IPad[now].ads[IPad[now].dis[i].intf].lin;
            next=IPad[now].ads[IPad[now].dis[i].intf].toi;
            x2=IPad[next].y;
            y2=IPad[next].x;
            dhop=IPad[now].dis[i].hop;
          }
        }
      }
      paint();
      document.getElementById("ttl_count").innerHTML = "TTL:"+ttl;
      ttl--;
      col=20;
    }
  }else if(col==20){
    if(time>100){
      draw2();
      henkou();
    }
    paint();
    col=10;
  }
    stepcnt++;
}

// 線の描画
function paint()
{
  if(col==10 || col==0){
    line[linenumber].attr({stroke:"#f00","stroke-width":3});
    ccount=IPad[now].y+(15*IPad[now].x);
    c[ccount].hide();
    ipadview[now].hide();
  }else if(col==20){
    line[linenumber].attr({stroke:"#000","stroke-width":1});
    ccount=IPad[next].y+(15*IPad[next].x);
    c[ccount].show();
    ipadview[next].show();
  }
}

// アニメーションの準備（発信元と送信先の確認）
function decision()
{
  document.getElementById('btn').innerHTML=" ";
  if(destine.x==-1 && destine.y==-1){
    alert(getText('choose_destination_click'));
    destination();
  }else{
    c[ccount].hide();
    flag=50;
    for(i=0;i<obj;i++){
      if(IPad[i].x==source.x && IPad[i].y==source.y){
        source.i=i;
        break;
      }
    }
    for(i=0;i<obj;i++){
      if(IPad[i].x==destine.x && IPad[i].y==destine.y){
        destine.i=i;
        destine.ad=IPad[i].ads[0].add.slice(0,IPad[i].ads[0].add.length-1);
        break;
      }
    }
    if(source.i==destine.i){
      alert(getText('same_sender_and_receiver'));
      destination();
    }else{
      if (document.all) { // for IE
        paper2.text(115,15,getText('destination_address')+IPad[destine.i].ads[0].add).attr({"font-size":"15","font-family":"ＭＳ ゴシック"});
      } else {
        paper2.text(105,15,getText('destination_address')+IPad[destine.i].ads[0].add).attr("font-size","15");
      }
      document.getElementById('IP_Indication').innerHTML=getText('hover');
      document.getElementById('btn').innerHTML=
            "<input type='button' value="+getText('start')+" onClick='anime_start(this.form)' id='start_button'>"
            + "<input type='button' value="+getText('step_by_step')+" onClick='stepc()' id='step_button'>"
            + "<input type='button' value="+getText('add')+" onClick='init()' id='add_button'>"
            + "<input type='button' value="+getText('clear')+" onClick='clear_all()' id='clear_button'>"
            + "<input type='button' value="+getText('help')+" onClick='help_step3()' id='help_button'>"
            + "<select name='speed' size='1' id='speed_menu'>"
            + "<option value='0'>"+getText('quick_speed')+"</option>"
            + "<option value='200' selected>"+getText('medium_speed')+"</option>"
            + "<option value='600'>"+getText('slow_speed')+"</option>"
            + "</select>";
    }
  }
}

// 初期画面ボタン配置
function init()
{
  app.lang = app.translations[currentLanguage] || app.translations.en;
  document.getElementById('TableRow').innerHTML="<th id='destination'>"+getText("destination_network")+"</th><th id='interface'>"+getText("interface")+"</th><th id='nexthop'>"+getText("nexthop")+"</th><th id='metric'>"+getText("metric")+"</th>";

  if(stepcnt!=0){
    line[linenumber].attr({stroke:"#000","stroke-width":1});
    ccount=IPad[next].y+(15*IPad[next].x);
    c[ccount].hide();
    ipadview[next].hide();
    stepcnt=0;
  }
  flag=-1;
  draw2();
  document.getElementById('IP_Indication').innerHTML="　";
  document.getElementById("ttl_count").innerHTML = "　";
  var intro_router = getText("intro_router");
  document.getElementById('btn').innerHTML="<input type='button' value="+getText('router') +" onClick='add1()' id='router-button'>"
        + "<input type='button' value="+getText('host')+" onClick='add2()' id='host-button' >"
        + "<input type='button' value="+getText('path')+" onClick='rout()' id='path-button'>"
        + "<input type='button' value="+getText('confirm')+" onClick='set()' id='confirm-button'>"
        + "<input type='button' value="+getText('clear')+" onClick='clear_all()' id='clear-button'>"
        + "<input type='button' value="+getText('help')+" onClick='help()' id='help-button'>";
}

// IPアドレスの表示
function IPwrite(ty,tx)
{
  var IPw="";
  for(i=0;i<obj;i++){
    if(IPad[i].x==tx && IPad[i].y==ty){
      break;
    }
  }
  for(j=0;j<IPad[i].co;j++){
    if((IPad[IPad[i].ads[j].toi].x-IPad[i].x)<0){
      IPw=IPw+getText("top");
    }else if((IPad[IPad[i].ads[j].toi].x-IPad[i].x)>0){
      IPw=IPw+getText("bottom");
    }
    if((IPad[IPad[i].ads[j].toi].y-IPad[i].y)<0){
      IPw=IPw+getText("left");
    }else if((IPad[IPad[i].ads[j].toi].y-IPad[i].y)>0){
      IPw=IPw+getText("right");
    }
    IPw=IPw+"："+IPad[i].ads[j].add+"　　";
  }
  ipadview[i].show();
  onm=i;
  document.getElementById('IP_Indication').innerHTML=IPw;
}

// 描画処理
function draw(event) {
  document.getElementById('holder').onmouseover = function(event){
    if(flag==50){
      adjustXY(event);
      if(M[y][x]==15 || M[y][x]==25){
        if(x+(15*y)!=ccount && ccount!=-1){
          c[ccount].hide();
        }
        ccount=x+(15*y);
        c[ccount].show();
        IPwrite(x,y);
      }else{
        c[ccount].hide();
        ipadview[onm].hide();
        document.getElementById('IP_Indication').innerHTML=getText('hover');
      }
    }
  }
  document.getElementById('holder').onclick = function(event){
    adjustXY(event);
    if (flag==0){           // フラグ（ルータ選択時）
      if(M[y][x]==0){
        img = paper.image("R.png", x*50, y*50, 50, 50);
        c[x+(15*y)] = paper.rect(x*50, y*50, 50, 50, 20).attr({stroke:"#f00"}).hide();
        img.toFront();
        M[y][x]=10;
      }
    }else if (flag==10){    // フラグ（ホスト選択時）
      if(M[y][x]==0){
        img = paper.image("P.png", x*50, y*50, 50, 50);
        c[x+(15*y)] = paper.rect(x*50, y*50, 50, 50, 10).attr({stroke:"#f00"}).hide();
        M[y][x]=20;
      }
    }else if(flag==20){     // フラグ（経路選択時）
      if(cflag==0){         // 始点情報取得
        if(M[y][x]==10 || M[y][x]==15 || M[y][x]==20){
          A[di][0]=y; A[di][1]=x;
          cflag=10;
          document.getElementById('IP_Indication').innerHTML=getText('choose_end');
        }
      }else if(cflag==10){  // 終点情報取得
        // 画像を表示
        if(A[di][0]==y && A[di][1]==x){
        }else{
          if(M[y][x]==10 || M[y][x]==15 || M[y][x]==20){
            if(M[A[di][0]][A[di][1]]==10 || M[A[di][0]][A[di][1]]==15 || M[A[di][0]][A[di][1]]==20){
              // 線の描画
              line[di]=paper.path("M"+(A[di][1]*50+25)+","+(A[di][0]*50+25)+"L"+(x*50+25)+","+(y*50+25));
              line[di].toBack();
              if(M[y][x]==20){
                M[y][x]=25;   // ネットワークにつながったホスト
              }else if(M[y][x]==10){
                M[y][x]=15;   // ネットワークにつながったルータ
              }
              if(M[A[di][0]][A[di][1]]==20){
                M[A[di][0]][A[di][1]]=25;
              }else if(M[A[di][0]][A[di][1]]==10){
                M[A[di][0]][A[di][1]]=15;
              }
              A[di][2]=y; A[di++][3]=x;
            }
          }
        }
        cflag=0;
        document.getElementById('IP_Indication').innerHTML=getText('choose_start');
      }
    }else if(flag==30){   // 発信元選択時
      if(M[y][x]==25){
        if(ccount!=-1 && ccount!=(x+(15*y))){
          c[ccount].hide();
        }
        ccount=x+(15*y);
        c[ccount].show();
        source.x=y;
        source.y=x;
      }
    }else if(flag==40){   // 送信先選択時
      if(M[y][x]==25){
        if(ccount!=-1 && ccount!=(x+(15*y))){
          c[ccount].hide();
        }
        ccount=x+(15*y);
        c[ccount].show();
        destine.x=y;
        destine.y=x;
      }
    }
  }
}

// 位置情報の取得
function adjustXY(event){
  if (!event) { event = window.event; }
  if (document.all) { // for IE
    hx = document.body.scrollLeft+event.clientX-15;
    hy = document.body.scrollTop+event.clientY-45;
  } else {
    hx = event.layerX-15;
    hy = event.layerY-45;
  }
  x=Math.floor(hx/50);
  y=Math.floor(hy/50);
}

// ルーティングテーブルの行の色変更
function henkou() {
  var x, y, z, mini, count, to;
  if(col==20){
    if(IPad[next].tag=="r"){
      count=0;
      for(x=0; x<IPad[next].rco; x++){
        mini=IPad[next].dis[x].hop;
        z=x;
        for(y=0; y<IPad[next].rco; y++){
          if(IPad[next].dis[x].toad==IPad[next].dis[y].toad){
            if(mini>IPad[next].dis[y].hop){
              mini=IPad[next].dis[y].hop;
              z=y;
            }else if(mini==IPad[next].dis[y].hop && x>y){
              z=y;
            }
          }
        }
        if(z==x){
          if(IPad[next].dis[z].toad == destine.ad){
            $("#tr_"+count).css("color","red");
          }
          count++;
        }
      }
    }
  }
}

// ルーティングテーブルの描画
function draw2() {
  var x, y, z, mini, count, to, rtl_data="";
  var rtl_height=460;
  // キャンバスの初期処理
  if(flag==-1){
    paper2.clear();
    jQuery('tbody tr').remove();
//    paper3.clear();
  }else if(col==20){
   jQuery('tbody tr').remove();
//    paper3.clear();
    if(IPad[next].tag=="r"){
      count=0;
      for(x=0; x<IPad[next].rco; x++){
        mini=IPad[next].dis[x].hop;
        z=x;
        for(y=0; y<IPad[next].rco; y++){
          if(IPad[next].dis[x].toad==IPad[next].dis[y].toad){
            if(mini>IPad[next].dis[y].hop){
              mini=IPad[next].dis[y].hop;
              z=y;
            }else if(mini==IPad[next].dis[y].hop && x>y){
              z=y;
            }
          }
        }
        if(z==x){
          to=IPad[next].dis[z].intf;
          rtl_data='<tr id="tr_'+count+'"><td>'+IPad[next].dis[z].toad+'0/24'+'</td><td>'+IPad[next].ads[to].add+'</td><td>'
                  +IPad[IPad[next].ads[to].toi].ads[IPad[next].ads[to].toj].add+'</td><td>'+IPad[next].dis[z].hop+'</td></tr>';
          jQuery('tbody').append(rtl_data);
          rtl_data="";
          count++;
        }
      }
    }
  }
}
