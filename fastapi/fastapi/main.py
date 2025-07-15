from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List


app = FastAPI(title="侨乡应用后端", description="提供侨乡应用的链接信息")

# 配置 CORS 跨域支持
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LinkInfo(BaseModel):
    id: int
    link: str


links_db = [
    {"id": 1, "link": "https://www.baidu.com/"},
    {"id": 2, "link": "https://www.baidu.com/"},
    {"id": 3, "link": "https://www.baidu.com/"},
]


@app.get("/api/links", response_model=List[LinkInfo], summary="获取所有链接信息")
async def get_links():
    return links_db

# API 端点 - 获取单个链接
@app.get("/api/links/{link_id}", response_model=LinkInfo, summary="获取单个链接信息")
async def get_link(link_id: int):
    link = next((item for item in links_db if item["id"] == link_id), None)
    if link is None:
        raise HTTPException(status_code=404, detail="链接未找到")
    return link

# 启动应用的命令
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)