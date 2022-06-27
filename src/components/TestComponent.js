import React, { useState, useEffect } from 'react';
import { getGitHubLabels } from '../helpers/getGitHubLabels';
import { createGitHubLabels } from '../helpers/createGitHubLabels';
import { addGitHubLabels } from '../helpers/addGitHubLabels';

export default function TestComponent() {
  createGitHubLabels();

  addGitHubLabels(0, ['User Reaction', 'Inclusiveness']);

  const [val, setVal] = useState([]);

  const getVal = async () => {
    const response = await getGitHubLabels();
    let res = [];
    for (let i = 0; i <= response.data.length - 1; i++) {
      res.push(response.data[i]);
    }
    setVal(res);
  };

  useEffect(() => {
    getVal();
  }, []);

  return (
    <p>test component active</p>
    // <div
    //   style={{
    //     textAlign: 'center',
    //     paddingLeft: '20%',
    //     paddingRight: '20%'
    //   }}
    // >
    //   {val.map((v) => {
    //     return <div>{v.name}</div>;
    //   })}
    // </div>
  );
}
