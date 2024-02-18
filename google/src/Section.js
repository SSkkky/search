import { useEffect, useState } from 'react';
import './App.css';

function Section({keyword}) {
  const [result, setResult] = useState(null);

  let url = `./data/${keyword}.json`;
//   let url = `https://www.googleapis.com/customsearch/v1/?q=${keyword}&key=AIzaSyDwHVtDPnQ0gAvMQnXSwdHiyt-LIlmUiRA
//   &cx=c3bfeca1422984473&fields=items(title,link,displayLink,snippet,pagemap/cse_thumbnail,pagemap/metatags/twitter:description)&num=4`;

  useEffect(() => {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setResult(data);
          console.log(data);
        })
        .catch(error => {
          console.log('Error:', error);
        });
  }, []);

  // const onSearchHandler = () => {
  //   setSearchText(elInput.current.value);
  //   elInput.current.value = '';
  // };

  return (
      <div className='recommendCont'>
        {/* 좌측 컨테이너 */}
        <div className='reLeftCont'>
          <span className='subTitle'>농담곰님께 추천하는</span>
          <p className='contentsTitle'><span>{keyword}</span> 강의</p>
          <a href='http://www.naver.com' target='_blank' rel="noreferrer" className='more'>전체보기 ⮕</a>
        </div>
        {/* 우측 컨테이너 */}
        <div className='reRightCont'>
        {result && (
          <>
              {result.items.map((item) => (
                <figure key={item.link} className='resultItemCont'>
                    {
                        /* undefined 예외 처리 조건문 */
                    item.pagemap && item.pagemap.cse_thumbnail
                    ? <img src={item.pagemap.cse_thumbnail[0].src} />
                    : <div className='notImg'><p>이미지가 없습니당!!</p></div>
                    }
                  <figcaption>
                    <h2 className='title'>{item.title}</h2>
                    <p className='snippet'>{item.snippet}</p>
                  </figcaption>
                </figure>
              ))}
          </>
        )}
        </div>
      
      </div>
  );
}

export default Section;
