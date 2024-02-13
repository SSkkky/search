import { useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [result, setResult] = useState(null);
  const [searchText, setSearchText] = useState('');
  const elInput = useRef();

  useEffect(() => {
    if (searchText) {
      fetch(`http://localhost:3333/search/blog?query=${searchText}`)
        .then(response => response.json())
        .then(data => {
          setResult(data);
          console.log(data);
        })
        .catch(error => {
          console.log('Error:', error);
        });
    }
  }, [searchText]);

  const onSearchHandler = () => {
    setSearchText(elInput.current.value);
    elInput.current.value = '';
  };

  return (
    <div className="App">
      <div className='searchCont'>
        <input type="text" placeholder='검색어를 입력해주세요' ref={elInput} />
        <button onClick={onSearchHandler}>검색</button>
      </div>
      {result && (
        <>
          <p><b>"{searchText}"</b> 검색 결과입니다.</p>
          <div className='resultCont'>
            {result.items.map((item) => (
              <div key={item.description} className='resultItemCont'>
                <h2 className='title'>{item.title}</h2>
                <p className='description'>{item.description}</p>
                <div className='bottomCont'>
                  <span className='nameDate'>{item.bloggername} | {item.postdate}</span>
                  <a href={item.link} target='_blank'>이동하기</a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
