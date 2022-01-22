import React, { useState } from 'react';
import { atom, selector, useRecoilValue, useRecoilState } from 'recoil';

const usersState = atom({
    key: 'users-state-atom',
    default: [
        { id: 1, name: 'Johnson', country: 'アメリカ' },
        { id: 2, name: 'Smith', country: 'カナダ' },
    ],
});

const locationState = atom({
    key: 'local-state-atom',
    default: '日本',
});

const toUpperUserNames = selector({
    key: 'to-upper-user-names',

    // getは必須で定義する
    get: ({ get }) => {
        const users = get(usersState);
        const upperUserNames = users.map((user) => user.name.toUpperCase());
        return upperUserNames;
    },

    // setはセッター関数として呼ばれる（setUpperNames）
    set: ({ set, get, reset }, name) => {
        //set関数の引数を受けとることができる

        const users = get(usersState);
        const country = get(locationState);

        // 今あるIDの中で最も大きいnumberを取得
        const ids = users.map((user) => user.id);
        console.log('👉 ids', ids);
        const maxId = Math.max(...ids);

        const newUser = {
            id: maxId + 1,
            name,
            country,
        };

        // setを使って他のatomの値を変更できる
        // set(何に追加するか（書き換える対象）, 追加する（書き換える値）)
        console.log('👉 usersState', usersState);
        set(usersState, [...users, newUser]);
        console.log('👉  [...users, newUser]',  [...users, newUser])
        console.log('👉 usersState', usersState);

        // resetを使用することでatomを初期値に戻すことができる
        if (users.length > 4) {
            reset(usersState);
        }
        // returnはない
    },
});

export const Selector = () => {
    const [inputName, setInputName] = useState('');
    const users = useRecoilValue(usersState);
    const currentLocation = useRecoilValue(locationState);
    const [upperNames, setUpperNames] = useRecoilState(toUpperUserNames);

    return (
        <div>
            <h2>use selector</h2>
            <p>現在の場所：{currentLocation}</p>
            <div>
                <h3>users</h3>
                <p>usersState(atom)の状態</p>
                {/* JSON文字列に変換する */}
                <pre>{JSON.stringify(users, null, 4)}</pre>
            </div>
            <div>
                <h3>upperNames</h3>
                <p>selector内で大文字に変換された名前の配列</p>
                <pre>{JSON.stringify(upperNames, null, 4)}</pre>
            </div>
            <div>
                <h3>add user</h3>
                <p>
                    入力された文字列をselectorのset関数内で加工してusersStateにオブジェクトとして追加する
                </p>
                <input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                />
                <button onClick={() => setUpperNames(inputName)}>
                    setUpperNames
                </button>
            </div>
        </div>
    );
};
