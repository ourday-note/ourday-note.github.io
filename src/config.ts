/** 실제 공개 전에 계좌번호 등 비어 있는 정보를 확인하세요. */
export const wedding = {
  groom: '박윤수',
  bride: '김서현',
  groomParents: '박태진 · 이지선',
  brideParents: '김대홍 · 김미연',
  date: '2026-10-17', // 토요일
  time: '13:40',
  venue: '아이벡스 컨벤션',
  venueDetail: 'AK플라자 광명점 5층',
  address: '경기도 광명시 양지로 17',
  venuePhone: '02-897-1002',
  photo: 'story-photo.jpg',
  closingPhoto: 'closing-photo.jpg',
  accounts: [
    { side: '신랑측', owner: '박윤수', bank: '국민은행', number: '362702-04-123254' },
    { side: '신부측', owner: '김서현', bank: '우리은행', number: '1002-966-339636' },
  ],
} as const;
