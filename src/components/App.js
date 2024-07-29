import React, { useState } from "react";
import '../styles/App.css';

const App = () => {
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [result, setResult] = useState("");

    const handle1 = (e) => {
        setInput1(e.target.value);
    };

    const handle2 = (e) => {
        setInput2(e.target.value);
    };

    const calculateRelationship = (input1, input2) => {
        if (!input1 || !input2) {
            setResult("Please Enter valid input");
            return;
        }

        let str1 = input1.split('');
        let str2 = input2.split('');
        let common = new Map();

        // Count occurrences of characters in both strings
        str1.forEach(char => {
            if (str2.includes(char)) {
                common.set(char, (common.get(char) || 0) + 1);
            }
        });

        // Remove common characters from both strings
        common.forEach((count, char) => {
            while (count-- > 0) {
                str1.splice(str1.indexOf(char), 1);
                str2.splice(str2.indexOf(char), 1);
            }
        });

        const remainingLengthSum = str1.length + str2.length;
        const resultModulus = remainingLengthSum % 6;

        const relationshipMap = {
            0: "Siblings",
            1: "Friends",
            2: "Love",
            3: "Affection",
            4: "Marriage",
            5: "Enemy"
        };

        setResult(relationshipMap[resultModulus] || "Please Enter valid input");
    };

    const handleClear = () => {
        setInput1("");
        setInput2("");
        setResult("");
    };

    return (
        <div id="main">
            <input type="text" placeholder="First name" id="input1" onChange={handle1} value={input1}></input>
            <input type="text" placeholder="Second name" id="input2" onChange={handle2} value={input2}></input>
            <button id="calculate_relationship" onClick={() => calculateRelationship(input1, input2)}>Calculate Relationship future</button>
            <button id="clear" onClick={handleClear}>Clear</button>
            <h3 id="result">{result}</h3>
        </div>
    );
};

export default App;
