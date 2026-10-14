# 미니멀 클래식 모바일 청첩장 (React + TypeScript)

GitHub Pages 배포 대상 계정: https://github.com/ourday-note

## 실행
```bash
npm install
npm run dev
```
브라우저에 나타나는 Vite 개발 서버 주소에서 확인합니다. 배포용 빌드: `npm run build`.

## 콘텐츠 변경
- `src/config.ts`: 신랑·신부 이름, 부모님 성함, 예식 날짜 및 시간, 장소, 대표 사진, 계좌 데이터
- `src/style.css`: 색상, 타이포그래피, 레이아웃
- `src/App.tsx`: 청첩장 화면 및 인터랙션

### 반영된 예식 정보
- 신랑: **박윤수** (부모: 박태진 · 이지선)
- 신부: **김서현** (부모: 김대홍 · 김미연)
- 예식: **2026년 10월 17일 토요일 오후 1시 40분**
- 장소: **AK플라자 광명점 5층 아이벡스 컨벤션**

`config.ts`의 `date`나 `time`을 수정하면 달력, 날짜 표기, 구글 캘린더 링크가 함께 바뀝니다.

### 실제 서비스 적용 시
- 계좌번호는 비어 있으므로 값을 입력하기 전까지 복사 버튼이 비활성화됩니다.
- 대표 이미지는 `public/wedding-photo.png`를 사용합니다. 다른 사진으로 바꾸려면 같은 파일명을 교체하거나 `src/config.ts`의 `photo` 값을 수정합니다.
- 지도 영역은 지도 SDK가 아닌 **스타일링된 약도**이며, 네이버 지도·카카오맵의 실제 검색 결과로 연결됩니다.
- 공유는 Web Share API를 지원하는 브라우저에서는 OS 공유 시트를 표시하고, 그 외 환경에서는 링크 복사를 수행합니다. 카카오톡 전용 메시지 템플릿을 적용하려면 Kakao JavaScript SDK 설정이 별도로 필요합니다.
- HTTPS 도메인에서 배포해야 클립보드/공유 기능을 안정적으로 사용할 수 있습니다.

## GitHub Pages 배포

1. 이 저장소를 GitHub 계정 또는 조직 `ourday-note`의 저장소로 push합니다.
2. 저장소의 **Settings > Pages**에서 배포 소스를 **GitHub Actions**로 선택합니다.
3. `main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 앱을 빌드하고 Pages에 배포합니다.

사용자/조직 사이트 저장소 이름을 `ourday-note.github.io`로 만들고, 청첩장은 `https://ourday-note.github.io/our-wedding/` 경로로 배포합니다.
