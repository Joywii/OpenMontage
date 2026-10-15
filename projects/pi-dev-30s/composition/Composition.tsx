import React from 'react';
import {AbsoluteFill, Audio, Easing, Sequence, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';

export type PiBuildProps = {
  captions?: {start: number; end: number; text: string}[];
  audio?: {src: string; start: number; duration?: number; volume?: number}[];
  narration?: {src: string; start: number; duration?: number; volume?: number}[];
};
const C = {paper:'#F3F0E7', ink:'#18201C', leaf:'#4B7958', light:'#E2E8DB', rule:'#C8CFC0', muted:'#59665A'};
const sans = '"Heiti SC", "STHeiti", sans-serif';
const serif = '"Songti SC", serif';
const mono = '"Menlo", monospace';
const ease = (f:number, delay=0, duration=20) => interpolate(f,[delay,delay+duration],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.cubic)});
const enter = (f:number, delay=0):React.CSSProperties => ({opacity:ease(f,delay),transform:`translateY(${(1-ease(f,delay))*28}px)`});
const place = (left:number, top:number, width?:number):React.CSSProperties => ({position:'absolute',left,top,width});

const Header:React.FC<{number:string; title:string; illustration?:boolean}> = ({number,title,illustration=true}) => <>
  <div style={{...place(96,181),fontFamily:mono,fontSize:29,letterSpacing:3,color:C.leaf}}>BUILD {number} / 03</div>
  {illustration && <div style={{position:'absolute',right:96,top:179,fontSize:36,color:C.muted}}>应用示意</div>}
  <div style={{...place(96,254,888),fontSize:72,fontFamily:serif,fontWeight:600,letterSpacing:-2}}>{title}</div>
  <div style={{...place(96,379,888),height:2,background:C.rule}} />
</>;
const Glyph:React.FC<{kind:'code'|'report'|'chat'; size?:number; color?:string; progress?:number}> = ({kind,size=84,color=C.leaf,progress=1}) => <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="4" strokeLinecap="square" style={{overflow:'visible'}}>
  <g pathLength={1} opacity={progress}>
    {kind==='code' && <><path d="M28 22 9 50 28 78 M72 22 91 50 72 78"/><path d="m59 16-18 68"/></>}
    {kind==='report' && <><path d="M18 9h43l21 21v61H18z M61 9v24h21"/><path d="M32 49h34 M32 63h34 M32 77h21"/></>}
    {kind==='chat' && <><path d="M9 16h82v59H39L20 92V75H9z"/><path d="M28 37h44 M28 52h31"/></>}
  </g>
</svg>;

const Question:React.FC = () => {
  const f=useCurrentFrame();
  return <AbsoluteFill>
    <div style={{...place(96,188),fontFamily:mono,fontSize:30,letterSpacing:4,color:C.leaf}}>A BUILDER'S GUIDE</div>
    <div style={{...place(96,492,888),...enter(f,0),fontFamily:serif,fontSize:100,lineHeight:1.45,fontWeight:600,letterSpacing:-2}}>
      用 <span style={{fontFamily:'Baskerville',fontStyle:'italic',fontSize:148,fontWeight:400}}>Pi</span>，<br/>你能构建什么？
    </div>
    <div style={{...place(98,904),height:8,width:interpolate(f,[12,36],[0,468],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.cubic)}),background:C.leaf}}/>
    {(['code','report','chat'] as const).map((kind,i)=><div key={kind} style={{...place(122+i*300,1220),...enter(f,18+i*9)}}><Glyph kind={kind} size={74}/></div>)}
    <div style={{...place(96,1362,888),height:2,background:C.rule}}/>
    <div style={{...place(96,1400),fontSize:34,color:C.muted,...enter(f,40)}}>从编程助手，到你自己的 AI 应用</div>
  </AbsoluteFill>;
};

const Coding:React.FC = () => {
  const f=useCurrentFrame(); const replacement=ease(f,46,30); const test=ease(f,105,25);
  return <AbsoluteFill>
    <Header number="01" title="专属编程助手"/>
    <div style={{...place(96,439,888),display:'flex',gap:18,fontSize:38}}>
      {['团队规范','Skills','扩展工具'].map((v,i)=><div key={v} style={{...enter(f,i*11),padding:'14px 20px',borderBottom:`3px solid ${C.leaf}`}}>{v}</div>)}
    </div>
    <div style={{...place(96,562,888),height:720,background:C.ink,color:C.paper,borderRadius:'4px 4px 24px 4px',overflow:'hidden'}}>
      <div style={{height:98,borderBottom:'1px solid #59665A',padding:'25px 36px',boxSizing:'border-box',fontFamily:mono,fontSize:32,color:'#B9C6B7'}}>src/name.ts</div>
      <div style={{...place(36,139,816),fontFamily:mono,fontSize:42,lineHeight:1.7}}>
        <div style={{color:'#CFA59C',opacity:1-replacement*.3,textDecoration:replacement>.8?'line-through':'none'}}>− return name.trim();</div>
        <div style={{width:`${replacement*100}%`,overflow:'hidden',whiteSpace:'nowrap',color:'#C5E7AE',borderLeft:`4px solid ${C.leaf}`,paddingLeft:14,boxSizing:'border-box'}}>+ return name.trim()<br/>&nbsp; || '匿名';</div>
      </div>
      <div style={{...place(36,426,816),borderTop:'1px solid #59665A',paddingTop:24,opacity:test,fontFamily:mono,fontSize:42,lineHeight:1.7}}>
        expect(displayName(' '))<br/><span style={{color:'#C5E7AE'}}> .toBe('匿名')</span>
      </div>
    </div>
    <div style={{...place(96,1326,888),...enter(f,157),display:'flex',alignItems:'center',gap:18,fontSize:40,color:C.leaf}}><span style={{display:'inline-block',height:14,width:14,background:C.leaf}}/>修改待审阅</div>
  </AbsoluteFill>;
};

const Workflow:React.FC = () => {
  const f=useCurrentFrame(); const branch=ease(f,73,30);
  return <AbsoluteFill>
    <Header number="02" title="自动化工作流"/>
    <svg style={place(0,0)} width="1080" height="1920" fill="none">
      <path d="M540 570V930M540 930H312V1026M540 930H768V1026" stroke={C.rule} strokeWidth="3"/>
      <path d="M540 570V930M540 930H312V1026M540 930H768V1026" stroke={C.leaf} strokeWidth="5" pathLength="1" strokeDasharray="1" strokeDashoffset={1-ease(f,20,85)}/>
      {f>=20 && f<73 && <rect x="529" y={interpolate(f,[20,73],[594,908])} width="22" height="22" fill={C.leaf}/>}
    </svg>
    <div style={{...place(332,445,416),fontSize:44,textAlign:'center',fontWeight:600,...enter(f,0)}}>仓库变更</div>
    <div style={{...place(492,528),width:96,height:66,border:`3px solid ${C.ink}`,background:C.paper,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:mono,fontSize:42}}>±</div>
    <div style={{...place(270,647,540),background:C.paper,border:`2px solid ${C.rule}`,padding:24,textAlign:'center',fontSize:42,...enter(f,30)}}>外部脚本 / CI</div>
    <div style={{...place(374,809,332),background:C.leaf,color:C.paper,padding:'22px 0',textAlign:'center',fontFamily:mono,fontSize:44,...enter(f,57)}}>Pi CLI</div>
    {[{x:130,title:'审查意见',text:<>空输入处理：<br/>建议检查</>},{x:586,title:'变更摘要',text:<>新增<br/>空名称回退</>}].map((r,i)=><div key={r.title} style={{...place(r.x,1020,364),height:280,boxSizing:'border-box',border:`2px solid ${C.ink}`,background:'#FAF8F1',padding:'28px 26px',opacity:branch,transform:`translateY(${(1-branch)*24}px)`}}>
      <div style={{fontSize:44,fontWeight:600,borderBottom:`3px solid ${C.leaf}`,paddingBottom:20}}>{r.title}</div>
      <div style={{fontSize:40,lineHeight:1.65,paddingTop:20,...enter(f,108+i*9)}}>{r.text}</div>
    </div>)}
    <div style={{...place(96,1360,888),fontSize:36,color:C.muted,textAlign:'center'}}>触发与调度由外部系统负责</div>
  </AbsoluteFill>;
};

const AppScene:React.FC = () => {
  const f=useCurrentFrame(); const ready=f>=90;
  return <AbsoluteFill>
    <Header number="03" title="自己的 AI 应用"/>
    <div style={{...place(96,443),fontFamily:mono,fontSize:30,color:C.muted,letterSpacing:2}}>YOUR WEB ASSISTANT</div>
    <div style={{...place(284,526,700),...enter(f,5),background:C.ink,color:C.paper,padding:'30px 32px',boxSizing:'border-box',fontSize:44,lineHeight:1.5,borderRadius:'26px 26px 2px 26px'}}>总结这次代码变更</div>
    <div style={{...place(96,705,760),...enter(f,45),fontSize:38,color:C.leaf,display:'flex',gap:18,alignItems:'center'}}><span style={{width:14,height:14,background:C.leaf,display:'inline-block'}}/>{ready?'仓库读取完成':'正在读取仓库'}</div>
    <div style={{...place(96,800,790),...enter(f,90),borderLeft:`5px solid ${C.leaf}`,padding:'23px 32px',fontSize:48,lineHeight:1.6}}>已整理审查建议<br/>与变更摘要</div>
    <div style={{...place(558,1063,426),...enter(f,135),display:'flex',gap:18,alignItems:'center',fontSize:38,color:C.leaf}}><Glyph kind="chat" size={58}/>另一种入口</div>
    <div style={{...place(96,1220,888),padding:'28px 0',borderTop:`2px solid ${C.rule}`,borderBottom:`2px solid ${C.rule}`,fontFamily:mono,fontSize:40,textAlign:'center'}}>TypeScript SDK / RPC</div>
    <div style={{...place(96,1360,888),fontSize:36,color:C.muted,textAlign:'center'}}>需自行集成界面、渠道与权限</div>
  </AbsoluteFill>;
};

const Closing:React.FC = () => {
  const f=useCurrentFrame();
  return <AbsoluteFill>
    <div style={{...place(96,188),fontFamily:mono,fontSize:30,letterSpacing:3,color:C.leaf}}>BUILD ON PI</div>
    <div style={{...place(96,416,888),...enter(f,0),fontSize:88,fontFamily:serif,fontWeight:600,lineHeight:1.4}}>构建你的<br/>AI 工具</div>
    {(['code','report','chat'] as const).map((kind,i)=>{
      const s=spring({frame:Math.max(0,f-i*4),fps:30,config:{damping:20,stiffness:100}});
      return <div key={kind} style={{...place(191+i*280,870),opacity:ease(f,i*4),transform:`translate(${(1-s)*(i-1)*75}px,${(1-s)*-80}px) rotate(${(1-s)*(i-1)*12}deg)`}}><Glyph kind={kind} size={112}/></div>;
    })}
    <div style={{...place(96,1060,888),height:166,background:C.leaf,color:C.paper,display:'flex',justifyContent:'center',alignItems:'center',fontSize:112,fontFamily:'Baskerville',fontStyle:'italic',...enter(f,7)}}>Pi</div>
    <div style={{...place(96,1254,888),fontSize:36,color:C.muted,textAlign:'center',opacity:ease(f,18)}}>从文档开始构建</div>
    <div style={{...place(96,1330,888),fontFamily:mono,fontSize:48,textAlign:'center',opacity:ease(f,15,15)}}>pi.dev/docs/latest</div>
    <div style={{...place(96,1630,888),fontSize:36,color:C.muted,textAlign:'center',lineHeight:1.5}}>工具按进程权限运行<br/>请审阅执行结果</div>
  </AbsoluteFill>;
};

export const PiBuildFilm:React.FC<PiBuildProps> = ({captions=[],audio=[],narration=[]}) => {
  const frame=useCurrentFrame(); const time=frame/30; const caption=frame>=75?captions.find(c=>time>=c.start&&time<c.end):undefined;
  return <AbsoluteFill style={{backgroundColor:C.paper,color:C.ink,fontFamily:sans,overflow:'hidden'}}>
    <div style={{...place(40,96,1000),height:1728,borderLeft:'1px solid #DDE0D4',borderRight:'1px solid #DDE0D4',pointerEvents:'none'}}/>
    <Sequence from={0} durationInFrames={75}><Question/></Sequence>
    <Sequence from={75} durationInFrames={240}><Coding/></Sequence>
    <Sequence from={315} durationInFrames={225}><Workflow/></Sequence>
    <Sequence from={540} durationInFrames={210}><AppScene/></Sequence>
    <Sequence from={750} durationInFrames={150}><Closing/></Sequence>
    {caption && <div style={{...place(96,1510,888),fontSize:48,textAlign:'center',lineHeight:1.55,whiteSpace:'pre-line'}}>{caption.text}</div>}
    {[...audio,...narration].map((a,i)=><Sequence key={`${a.src}-${i}`} from={Math.round(a.start*30)} durationInFrames={a.duration?Math.ceil(a.duration*30):undefined}><Audio src={a.src.startsWith('http')?a.src:staticFile(a.src)} volume={a.volume??1}/></Sequence>)}
  </AbsoluteFill>;
};
