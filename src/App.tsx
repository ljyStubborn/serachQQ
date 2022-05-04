import React, { useState, useEffect } from "react";
import "./App.css";
import { Spin } from "antd";
import { getQQList, debounce } from "./service";
import $message from "./component/message/index";
function App() {
	const [data, setData] = useState<any>({});
	const [loading, setLoading] = useState(false);
	const serach = debounce((val: string) => {
		const Exp = /^[1-9][0-9]\d{4,9}$/;
		if (Exp.test(val)) {
			setLoading(true);
			getQQList({ qq: val }).then((res: any) => {
				const { status, data } = res;
				if (status === 200 && data?.code === 1) {
					setData(data);
				} else {
          setData({});
					$message.error(data?.msg || "网络开小差");
				}
				setLoading(false);
			});
		} else {
			setData({});
			$message.error("请输入正确格式");
		}
	}, 1000);
	return (
		<div className='App'>
			<div className='title'>查询qq</div>
			<div>
				QQ
				<input
					onChange={e => serach(e.target.value)}
					style={{ marginLeft: 10 }}></input>
			</div>
			<Spin spinning={loading}>
				{Object.keys(data).length > 0 && (
					<div className='card'>
						<div className='logo'>
							<img src={data.qlogo} className='logo' alt=""></img>
						</div>
						<div className='con'>
							<div className='content'>{data.name}</div>
							<div className='content'>{data.qq}</div>
						</div>
					</div>
				)}
			</Spin>
		</div>
	);
}

export default App;
