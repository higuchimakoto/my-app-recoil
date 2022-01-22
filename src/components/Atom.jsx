import React from 'react';

import {
    atom,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
} from 'recoil';

// 別ファイルに管理する必要がある。
const countState = atom({
    key: 'count-state-test-atom', //uniqueのkeyを設定する
    default: 0, //初期値を設定する。
});

export const Atom = () => {
    const [count, setCount] = useRecoilState(countState);

    // それぞれを別に呼び出すことが可能
    const countValue = useRecoilValue(countState);
    const setCountValue = useSetRecoilState(countState);

    return (
        <div>
            <h2>use atom</h2>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>count up</button>
            <button onClick={() => setCount(count - 1)}>count down</button>
            <button onClick={() => setCount(0)}>reset</button>
        </div>
    );
};
