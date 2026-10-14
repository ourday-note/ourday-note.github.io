import { useEffect, useState } from 'react';
import { ArrowUpRight, CalendarDays, Check, ChevronDown, Copy, Heart, MapPin, Navigation, Share2, Train, Car, X } from 'lucide-react';
import { wedding } from './config';

const formatDate = new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', timeZone: 'Asia/Seoul' });
const weddingDay = new Date(`${wedding.date}T${wedding.time}:00+09:00`);
const fullDate = formatDate.format(weddingDay);
const dateText = `${fullDate} 오후 ${Number(wedding.time.split(':')[0]) - 12}시 ${Number(wedding.time.split(':')[1])}분`;
const dateParts = wedding.date.split('-').map(Number);
const navQuery = encodeURIComponent(`아이벡스 컨벤션 ${wedding.address}`);
const start = `${wedding.date.replaceAll('-', '')}T${wedding.time.replace(':', '')}00`;
const endDate = new Date(weddingDay.getTime() + 2 * 60 * 60 * 1000);
const end = `${new Intl.DateTimeFormat('en-CA', {timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit'}).format(endDate).replaceAll('-', '')}T${new Intl.DateTimeFormat('en-GB', {timeZone: 'Asia/Seoul',hour: '2-digit', minute: '2-digit',hourCycle: 'h23'}).format(endDate).replace(':', '')}00`;
const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`${wedding.groom} ♥ ${wedding.bride} 결혼식`)}&dates=${start}/${end}&ctz=Asia%2FSeoul&details=${encodeURIComponent('결혼식에 초대합니다')}&location=${encodeURIComponent(`${wedding.venue}, ${wedding.address}`)}`;

async function copyToClipboard(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.append(textarea);
    textarea.select();
    const result = document.execCommand('copy');
    textarea.remove();
    return result;
  }
}

function Calendar() {
  const [year, month, day] = dateParts;
  const firstDay = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const length = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return <div className="calendar" aria-label={`${year}년 ${month}월 달력`}>
    <div className="calendar-heading">{year} <span>/</span> {String(month).padStart(2, '0')}</div>
    <div className="calendar-grid week">{['SUN','MON','TUE','WED','THU','FRI','SAT'].map((v) => <span key={v}>{v}</span>)}</div>
    <div className="calendar-grid days">{Array.from({ length: firstDay }, (_, i) => <span key={`blank-${i}`} />)}{Array.from({ length }, (_, i) => <span key={i} className={day === i + 1 ? 'selected' : ''}>{i + 1}</span>)}</div>
  </div>;
}

function SectionTitle({ kicker, title }: { kicker: string, title: string }) {
  return <div className="section-title"><span className="kicker">{kicker}</span><h2>{title}</h2><i aria-hidden="true" /></div>;
}

export default function App() {
  const [expanded, setExpanded] = useState<'신랑측' | '신부측' | null>(null);
  const [toast, setToast] = useState('');
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(''), 2800);
    return () => window.clearTimeout(t);
  }, [toast]);

  const notify = (msg: string) => setToast(msg);
  const copy = async (content: string, message: string) => notify(await copyToClipboard(content) ? message : '복사에 실패했습니다. 브라우저 권한을 확인해 주세요.');

  const share = async () => {
    const data = { title: `${wedding.groom} ♥ ${wedding.bride} 결혼식`, text: `${dateText}\n${wedding.venue}`, url: window.location.href };
    if (navigator.share) {
      try { await navigator.share(data); } catch (e) { if ((e as DOMException).name !== 'AbortError') await copy(data.url, '청첩장 링크를 복사했습니다.'); }
    } else await copy(data.url, '청첩장 링크를 복사했습니다.');
  };

  return <div className="desktop-frame">
    <main className="invitation">
      <header className="top-bar"><span>THE WEDDING OF</span><Heart size={13} strokeWidth={1.4} /></header>
      <section className="hero">
        <div className="hero-type"><span className="eyebrow">Together, forever</span><h1>{wedding.groom} <small>&</small> {wedding.bride}</h1><p>WE ARE GETTING MARRIED</p></div>
        <div className="hero-photo"><img src={wedding.photo} alt={`${wedding.groom} ${wedding.bride} 웨딩 사진`} /><div className="photo-shade"/><span className="hero-photo-caption">a beautiful beginning</span></div>
        <div className="hero-date"><span>{new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Seoul', month: 'long', day: 'numeric', year: 'numeric' }).format(weddingDay).toUpperCase()}</span><span>{new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', hour12: true }).format(weddingDay)}</span></div>
      </section>
      <section className="intro section-pad"><SectionTitle kicker="INVITATION" title="소중한 분들을 초대합니다" />
        <p className="invitation-message">서로의 하루를 궁금해하고<br/>작은 순간에도 함께 웃는 두 사람이<br/>이제 평생을 함께하려 합니다.<br/><br/>저희의 새로운 시작에 귀한 걸음 하시어<br/>따뜻한 축복을 나누어 주시면 감사하겠습니다.</p>
        <div className="family"><p><span>신랑</span> {wedding.groomParents} <em>의 아들</em> <b>{wedding.groom}</b></p><p><span>신부</span> {wedding.brideParents} <em>의 딸</em> <b>{wedding.bride}</b></p></div>
      </section>
      <section className="schedule section-pad"><SectionTitle kicker="THE DAY" title="우리의 특별한 날" /><p className="schedule-date">{wedding.date.replaceAll('-', '. ')} <span>{new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'Asia/Seoul' }).format(weddingDay).toUpperCase()}</span></p><p className="schedule-time">{`오후 ${Number(wedding.time.split(':')[0]) - 12}시 ${Number(wedding.time.split(':')[1])}분`}</p><Calendar /><a className="outlined-button" href={calendarUrl} target="_blank" rel="noreferrer"><CalendarDays size={17} /> 구글 캘린더에 저장 <ArrowUpRight size={15} /></a></section>
      <section className="location section-pad"><SectionTitle kicker="LOCATION" title="오시는 길"/><p className="venue-name">{wedding.venue}</p><p className="venue-info">{wedding.venueDetail}<br/>{wedding.address}</p>
        <div className="map-visual" role="img" aria-label="지도 서비스 길찾기 버튼으로 연결되는 예식장 위치 안내"><div className="map-lines"/><div className="map-pin"><MapPin size={24} fill="currentColor"/></div><strong>IVEX CONVENTION</strong><small>광명역 · AK플라자 광명</small></div>
        <div className="nav-links"><a href={`https://map.naver.com/p/search/${navQuery}`} target="_blank" rel="noreferrer"><Navigation size={17}/> 네이버 지도</a><a href={`https://map.kakao.com/link/search/${navQuery}`} target="_blank" rel="noreferrer"><MapPin size={17}/> 카카오맵</a></div>
        <button className="address-copy" onClick={() => copy(wedding.address, '주소를 복사했습니다.')}><Copy size={14}/> 주소 복사하기</button>
        <div className="transport"><div><Train size={18}/><p><strong>대중교통</strong><br/>KTX · 1호선 광명역 1·3번 출구 도보 약 5분</p></div><div><Car size={18}/><p><strong>자가용 및 주차</strong><br/>내비게이션에서 '아이벡스컨벤션' 검색<br/>AK플라자 광명 지하 주차장 이용</p></div></div>
      </section>
      <section className="account section-pad"><SectionTitle kicker="WITH GRATITUDE" title="마음 전하실 곳"/><p className="account-message">직접 축하를 전하지 못하시는 분들을 위해<br/>마음을 전하실 곳을 안내드립니다.</p>
        {wedding.accounts.map((a) => <div className="accordion" key={a.side}><button className="accordion-head" aria-expanded={expanded === a.side} onClick={() => setExpanded(expanded === a.side ? null : a.side)}><span>{a.side} 계좌번호</span><ChevronDown size={18} className={expanded === a.side ? 'rotate' : ''}/></button>{expanded === a.side && <div className="accordion-content"><div><span>{a.owner}</span><small>{a.bank} {a.number || '계좌번호 등록 전'}</small></div><button disabled={!a.number} onClick={() => copy(`${a.bank} ${a.number}`, '계좌번호를 복사했습니다.')}><Copy size={15}/> 복사</button></div>}</div>)}
        <p className="account-notice">* 현재 계좌번호는 입력되지 않은 샘플입니다.</p>
      </section>
      <section className="closing"><div className="closing-ornament">✳</div><p>기쁜 날, 소중한 발걸음을 기다립니다.</p><h2>Thank you</h2><span>{wedding.groom} & {wedding.bride}</span></section>
      <footer><button onClick={share}><Share2 size={17}/> 청첩장 공유하기</button><button onClick={() => copy(window.location.href, '청첩장 링크를 복사했습니다.')}><Copy size={16}/> 링크 복사</button><button className="help" onClick={() => setShowGuide(true)}>안내 <ArrowUpRight size={12}/></button></footer>
      {toast && <div className="toast" role="status"><Check size={16}/>{toast}</div>}
      {showGuide && <div className="overlay" onClick={() => setShowGuide(false)}><div className="modal" role="dialog" aria-modal="true" aria-label="샘플 안내" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setShowGuide(false)} aria-label="닫기"><X size={21}/></button><h3>샘플 안내</h3><p>이름, 부모님 성함, 예식 정보와 첨부 사진을 반영했습니다. 계좌번호는 아직 샘플이며 <code>src/config.ts</code>에서 수정할 수 있습니다.</p><p>예식일은 <b>2026년 10월 17일 토요일 오후 1시 40분</b>입니다. 날짜·시간을 변경하려면 <code>src/config.ts</code>에서 수정해 주세요. 달력과 구글 캘린더 링크에 자동 반영됩니다.</p><p>공유 기능은 HTTPS 환경에서 가장 안정적으로 작동합니다.</p></div></div>}
    </main>
  </div>;
}
