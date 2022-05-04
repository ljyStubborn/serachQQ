import React, { useState, useEffect } from "react";
import "./App.css";
import { getQQList, debounce } from "./service";
import $message from "./component/message/index";
function App() {
	const [data, setData] = useState<any>({});
	const serach = debounce((val: string) => {
		const Exp = /^[1-9][0-9]\d{4,9}$/;
		if (Exp.test(val)) {
			getQQList({ qq: val }).then((res: any) => {
				const { status, data, msg } = res;
				if (status === 200) {
					setData(data);
          $message.success("成功")
				} else {
					$message.error(msg || "网络开小差");
				}
			});
		} else {
			alert("请输入正确格式");
		}
	}, 1000);
	return (
		<div className='App'>
			<div>查询qq</div>
			<div>
				QQ
				<input onChange={e => serach(e.target.value)}></input>
			</div>
			{Object.keys(data).length > 0 && (
				<div className='card'>
					<div className='logo'>
						<img src={data.qlogo} className='logo'></img>
					</div>
					<div className="con">
						<div className='content'>{data.name}</div>
						<div className='content'>{data.qq}</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
