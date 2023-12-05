import React, { useState } from 'react';
/* https://www.youtube.com/watch?v=5nq61iIKVDE */


export default function Bidder(props){
    const [totalMoney, settotalMoney] = useState(Number(props.money));
    const [moneyBid, setMoneyBid] = useState(0);
    const [moneyLeft, setMoneyLeft] = useState(totalMoney);
    const handleClick = (extraCash) => {
        if (moneyLeft - extraCash >= 0 && moneyBid + extraCash >= 0) {
            setMoneyBid(moneyBid + extraCash);
            setMoneyLeft(moneyLeft - extraCash);
        }
    };
    return(
        <div className='moneycontainer'>
            <div className='centeredcontainer'>
                <div className='container'>
                    <div className='bar'>
                        <div className='progress' style={{width: `${(moneyBid/(moneyLeft + moneyBid))*100}%`}}>
                            {" "}
                        </div>
                    </div>
                </div>
            </div>

            <div className='centeredcontainer'>
                <div className='progress-label'>{moneyBid}/{moneyBid+moneyLeft}$ == {((moneyBid/(moneyBid+moneyLeft))*100).toFixed(1)}%</div>
            </div>
            <div className='centeredcontainer'>
                <button className='bidbutton' onClick={() => handleClick(-(totalMoney/5).toFixed(0))}>
                    -{(totalMoney/5).toFixed(0)}
                </button>
                <button className='bidbutton' onClick={() => handleClick(-1)}>
                    -1
                </button>
                <button className='bidbutton' onClick={() => handleClick(1)}>
                    +1
                </button>
                <button className='bidbutton' onClick={() => handleClick(-(-(totalMoney/5).toFixed(0)))}>
                    +{(totalMoney/5).toFixed(0)}
                </button>
            </div>
            <div className='centeredcontainer'>
                <button className='submitbutton'>
                    Submit
                </button>
            </div>
            {/* Total de money: {props.money} */}
        </div>
    )
}