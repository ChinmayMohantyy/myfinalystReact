export const groupingColumn = [

    {
        Header: 'LEDGER CODE',
        accessor : 'ledger_code'
    },
    {
        Header: 'LEDGER NAME',
        accessor : 'ledger_name'
    },
    // {
    //     Header: 'BRANCH',
    //     accessor : 'branch'
    // },
    {
        Header: 'CURRENT YEAR',
        accessor : 'cy'
    },
    {
        Header: 'ADJUSTED AMT',
        accessor : 'adjusted_amount'
    },
    {
        Header: 'FINAL AMT',
        accessor : ''
    },
    {
        Header: 'PREVIOUS YEAR',
        accessor : 'py'
    },
    {
        Header: 'FS GROUPING',
        accessor : 'fs_grp',
        maxWidth: 400,
        minWidth: 140,
        width: 200,  
    },
    {
        Header: 'NOTES GROUPING',
        accessor : 'note_grp',
        maxWidth: 400,
        minWidth: 140,
        width: 200, 
    },
    {
        Header: 'SUB GROUPING',
        accessor : 'sub_grp',
        maxWidth: 400,
        minWidth: 140,
        width: 200, 
    }
]