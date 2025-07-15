import React, { useState, useEffect } from 'react';
import '../css/HomePage.css';

const HomePage = () => {

  const baseAuthors = [
    {
      id: 1,
      name: "侨乡迷踪·沉浸剧场",
      summary: "用户输入要求，平台生成侨乡剧本并转视频，丰富研学素材，助力了解文化。",
      imageUrl: "/1.png",
      link: "" 
    },
    {
      id: 2,
      name: "尺素万里·侨批摹写",
      summary: "用户输入信息，平台生成侨批文本、图片并以地图动画展示寄送过程。",
      imageUrl: "/2.png",
      link: ""
    },
    {
      id: 3,
      name: "榕根万里·云上寻踪",
      summary: "用户输入信息可查祖先信息，助寻根问祖，增强家族文化认同。",
      imageUrl: "/3.png",
      link: ""
    }
  ];

  const [authors, setAuthors] = useState([...baseAuthors]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {

        const response = await fetch('http://localhost:8000/api/links');
        
        if (!response.ok) {
          throw new Error(`HTTP错误! 状态: ${response.status}`);
        }
        
        const linksData = await response.json();
        

        const updatedAuthors = baseAuthors.map(author => {
          const linkData = linksData.find(link => link.id === author.id);
          return {
            ...author,
            link: linkData ? linkData.link : author.link
          };
        });
        
        setAuthors(updatedAuthors);
      } catch (err) {
        setError(err.message);
        console.error("获取链接失败:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  if (loading) return <div className="loading">加载中...</div>;
  if (error) return <div className="error">错误: {error}</div>;

  return (
    <div className="homepage-container">
      {/* 背景图片 */}
      <div className="background-container">
        <img 
          src="/background.png" 
          alt="背景" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.1)' }}></div>
      </div>

      {/* 卡片容器 */}
      <div className="author-card-container">
        {authors.map(author => (
          <div className="card" key={author.id}>
            <div className="photo">
              <img src={author.imageUrl} alt={author.name} />
            </div>
            <h5>{author.name}</h5>
            <p>{author.summary}</p>
            <a href={author.link}>开始使用</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;