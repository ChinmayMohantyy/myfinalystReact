import React from 'react'

export const ConventionalTable = () => {
    return (
        <div>
            <div className='conventionnalTable'>
                <div className='rowHeader'>
                    <div className="ledgerCode">
                        <input type="checkbox"  />
                        <p>LEDGER CODE</p>
                    </div>
                    <div className="ledgerName"><p>LEDGER NAME</p></div>
                    <div className="branch"><p>BRANCH</p></div>
                    <div className="year2021"><p>YEAR 2021</p></div>
                    <div className="year2020"><p>YEAR 2020</p></div>
                    <div className="adjustedAmt"><p>ADJUSTED AMT</p></div>
                    <div className="finalAmt"><p>FINAL AMT</p></div>
                    <div className="fsGrouping"><p>FS GROUPING</p></div>
                    <div className="notesGrouping"><p>NOTES GROUPING</p></div>
                    <div className="subGrouping"><p>SUB GROUPING</p></div>

                </div>
            </div>
            
        </div>
    )
}
