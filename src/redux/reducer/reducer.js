import * as actionTypes from "../actionTypes";

const groupings = {
  grp: [
    {
      fs_grp: "Non Current Assets",
      notes_grp: [
        {
          notes_grp: "Property, Plant & Equipment",
          notes_no: "3",
          disclosures: true,
          sub_grp: [
            {
              sub_grp: "Land - Gross block",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Exchange Differences",
                "Additions",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Acquisition of subsidiary",
                "Transfers",
                "Assets classified as held for sale",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Land - Accumulated depreciation",
              //   "sub_grp": "Freehold Land - Closing Accumulated Depreciation",
              disclosures: [
                "Opening Accumulated Depreciation",
                "Depreciation charge during the year",
                "Exchange Differences",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Impairment Loss (iii)",
                "Assets classified as held for sale",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Building - Gross block",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Exchange Differences",
                "Additions",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Acquisition of subsidiary",
                "Assets classified as held for sale",
                "Transfers",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Building - Accumulated depreciation",
              disclosures: [
                "Opening Accumulated Depreciation",
                "Depreciation charge during the year",
                "Exchange Differences",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Impairment Loss (iii)",
                "Assets classified as held for sale",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Plant and equipment - Gross block",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Exchange Differences",
                "Additions",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Acquisition of subsidiary",
                "Assets classified as held for sale",
                "Transfers",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Plant and equipment - Accumulated depreciation",
              disclosures: [
                "Opening Accumulated Depreciation",
                "Depreciation charge during the year",
                "Exchange Differences",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Impairment Loss (iii)",
                "Assets classified as held for sale",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Furniture and fixtures - Gross block",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Exchange Differences",
                "Additions",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Acquisition of subsidiary",
                "Assets classified as held for sale",
                "Transfers",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Furniture and fixtures - Accumulated depreciation",
              disclosures: [
                "Opening Accumulated Depreciation",
                "Depreciation charge during the year",
                "Exchange Differences",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Impairment Loss (iii)",
                "Assets classified as held for sale",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Vehicles - Gross block",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Exchange Differences",
                "Additions",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Acquisition of subsidiary",
                "Assets classified as held for sale",
                "Transfers",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Vehicles - Accumulated depreciation",
              disclosures: [
                "Opening Accumulated Depreciation",
                "Depreciation charge during the year",
                "Exchange Differences",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Impairment Loss (iii)",
                "Assets classified as held for sale",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Office equipment - Gross block",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Exchange Differences",
                "Additions",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Acquisition of subsidiary",
                "Assets classified as held for sale",
                "Transfers",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Office equipment - Accumulated depreciation",
              disclosures: [
                "Opening Accumulated Depreciation",
                "Depreciation charge during the year",
                "Exchange Differences",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Impairment Loss (iii)",
                "Assets classified as held for sale",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Bearer plants - Gross block",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Exchange Differences",
                "Additions",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Acquisition of subsidiary",
                "Assets classified as held for sale",
                "Transfers",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Bearer plants - Accumulated depreciation",
              disclosures: [
                "Opening Accumulated Depreciation",
                "Depreciation charge during the year",
                "Exchange Differences",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Impairment Loss (iii)",
                "Assets classified as held for sale",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Land - Right of use asset - Gross block",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Exchange Differences",
                "Additions",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Acquisition of subsidiary",
                "Assets classified as held for sale",
                "Transfers",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Land - Right of use asset - Accumulated depreciation",
              disclosures: [
                "Opening Accumulated Depreciation",
                "Depreciation charge during the year",
                "Exchange Differences",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Impairment Loss (iii)",
                "Assets classified as held for sale",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Building - Right of use asset - Gross block",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Exchange Differences",
                "Additions",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Acquisition of subsidiary",
                "Assets classified as held for sale",
                "Transfers",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Building - Right of use asset - Accumulated depreciation",
              disclosures: [
                "Opening Accumulated Depreciation",
                "Depreciation charge during the year",
                "Exchange Differences",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Impairment Loss (iii)",
                "Assets classified as held for sale",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Plant and equipment - Right of use asset - Gross block",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Exchange Differences",
                "Additions",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Acquisition of subsidiary",
                "Assets classified as held for sale",
                "Transfers",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Plant and equipment - Right of use asset - Accumulated depreciation",
              disclosures: [
                "Opening Accumulated Depreciation",
                "Depreciation charge during the year",
                "Exchange Differences",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Impairment Loss (iii)",
                "Assets classified as held for sale",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Furniture and fixtures - Right of use asset - Gross block",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Exchange Differences",
                "Additions",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Acquisition of subsidiary",
                "Assets classified as held for sale",
                "Transfers",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Furniture and fixtures - Right of use asset - Accumulated depreciation",
              disclosures: [
                "Opening Accumulated Depreciation",
                "Depreciation charge during the year",
                "Exchange Differences",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Impairment Loss (iii)",
                "Assets classified as held for sale",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Vehicles - Right of use asset - Gross block",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Exchange Differences",
                "Additions",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Acquisition of subsidiary",
                "Assets classified as held for sale",
                "Transfers",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Vehicles - Right of use asset - Accumulated depreciation",
              disclosures: [
                "Opening Accumulated Depreciation",
                "Depreciation charge during the year",
                "Exchange Differences",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Impairment Loss (iii)",
                "Assets classified as held for sale",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Office equipment - Right of use asset - Gross block",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Exchange Differences",
                "Additions",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Acquisition of subsidiary",
                "Assets classified as held for sale",
                "Transfers",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Office equipment - Right of use asset - Accumulated depreciation",
              disclosures: [
                "Opening Accumulated Depreciation",
                "Depreciation charge during the year",
                "Exchange Differences",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Impairment Loss (iii)",
                "Assets classified as held for sale",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Bearer plants - Right of use asset - Gross block",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Exchange Differences",
                "Additions",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Acquisition of subsidiary",
                "Assets classified as held for sale",
                "Transfers",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Bearer plants - Right of use asset - Accumulated depreciation",
              disclosures: [
                "Opening Accumulated Depreciation",
                "Depreciation charge during the year",
                "Exchange Differences",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Impairment Loss (iii)",
                "Assets classified as held for sale",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Capital Work-In Progress",
          notes_no: "3",
          disclosures: true,
          sub_grp: [
            {
              sub_grp: "Capital work-in-progress",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Exchange Differences",
                "Additions",
                "Assets included in a disposal group classified as held for sale",
                "Disposals",
                "Acquisition of subsidiary",
                "Assets classified as held for sale",
                "Transfers",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Investment Properties",
          notes_no: "4",
          disclosures: true,
          sub_grp: [
            {
              sub_grp: "Investment property",
              disclosures: ["Opening Gross Carrying Amount", "Additions"],
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Other Intangible Assets",
          notes_no: "5",
          disclosures: true,
          sub_grp: [
            {
              sub_grp: "Brands/trademarks",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Additions",
                "Additions - internal development",
                "Acquisition of subsidiary",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Brands/trademarks - Amortisation",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Additions",
                "Additions - internal development",
                "Acquisition of subsidiary",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Computer Software",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Additions",
                "Additions - internal development",
                "Acquisition of subsidiary",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Computer software - Amortisation",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Additions",
                "Additions - internal development",
                "Acquisition of subsidiary",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Mastheads and publishing titles",
              disclosures: [
                "Opening Accumulated Amortization",
                "Amortization charge for the year",
                "Impairment Charge",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Mastheads and publishing titles - Amortisation",
              disclosures: [
                "Opening Accumulated Amortization",
                "Amortization charge for the year",
                "Impairment Charge",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Mining rights",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Additions",
                "Additions - internal development",
                "Acquisition of subsidiary",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Mining rights - Amortisation",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Additions",
                "Additions - internal development",
                "Acquisition of subsidiary",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Copyrights, patents, other intellectual property rights, services and operating rights",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Additions",
                "Additions - internal development",
                "Acquisition of subsidiary",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Copyrights, patents, other intellectual property rights, services and operating rights - Amortisation",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Additions",
                "Additions - internal development",
                "Acquisition of subsidiary",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Recipes, formulae, models, designs and prototypes",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Additions",
                "Additions - internal development",
                "Acquisition of subsidiary",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Recipes, formulae, models, designs and prototypes - Amortisation",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Additions",
                "Additions - internal development",
                "Acquisition of subsidiary",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Licenses and franchise",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Additions",
                "Additions - internal development",
                "Acquisition of subsidiary",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Licenses and franchise - Amortisation",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Additions",
                "Additions - internal development",
                "Acquisition of subsidiary",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Goodwill",
          notes_no: "5",
          disclosures: true,
          sub_grp: [
            {
              sub_grp: "Goodwill",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Additions",
                "Additions - internal development",
                "Acquisition of subsidiary",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Intangible assets under development",
          notes_no: "",
          disclosures: true,
          sub_grp: [
            {
              sub_grp: "Intangible assets under development",
              disclosures: [
                "Opening Gross Carrying Amount",
                "Additions",
                "Additions - internal development",
                "Acquisition of subsidiary",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Biological assets other than bearer plants",
          notes_no: "",
          disclosures: true,
          sub_grp: [
            {
              sub_grp: "Biological assets other than bearer plants",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Investments",
          notes_no: "6(a)",
          disclosures: true,
          sub_grp: [
            {
              sub_grp: "Investments in Equity Instruments - Quoted",
              disclosures: [
                "Company Name",
                "Equity Shares - Current Year",
                "Equity Shares - Previous Year",
                "Amount - Current Year",
                "Amount - Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Investments in Equity Instruments - Unquoted",
              disclosures: [
                "Company Name",
                "Equity Shares - Current Year",
                "Equity Shares - Previous Year",
                "Amount - Current Year",
                "Amount - Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Investments in Preference Shares - Quoted",
              disclosures: [
                "Company Name",
                "Equity Shares - Current Year",
                "Equity Shares - Previous Year",
                "Amount - Current Year",
                "Amount - Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Investments in Preference Shares - Unquoted",
              disclosures: [
                "Company Name",
                "Equity Shares - Current Year",
                "Equity Shares - Previous Year",
                "Amount - Current Year",
                "Amount - Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Investments in Government or trust securities - Quoted",
              disclosures: [
                "Company Name",
                "Equity Shares - Current Year",
                "Equity Shares - Previous Year",
                "Amount - Current Year",
                "Amount - Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Investments in Government or trust securities - Unquoted",
              disclosures: [
                "Company Name",
                "Equity Shares - Current Year",
                "Equity Shares - Previous Year",
                "Amount - Current Year",
                "Amount - Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Investments in debentures and bonds - Quoted",
              disclosures: [
                "Company Name",
                "Equity Shares - Current Year",
                "Equity Shares - Previous Year",
                "Amount - Current Year",
                "Amount - Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Investments in debentures and bonds - Unquoted",
              disclosures: [
                "Company Name",
                "Equity Shares - Current Year",
                "Equity Shares - Previous Year",
                "Amount - Current Year",
                "Amount - Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Investments in mutual funds - Quoted",
              disclosures: [
                "Company Name",
                "Equity Shares - Current Year",
                "Equity Shares - Previous Year",
                "Amount - Current Year",
                "Amount - Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Investments in mutual funds - Unquoted",
              disclosures: [
                "Company Name",
                "Equity Shares - Current Year",
                "Equity Shares - Previous Year",
                "Amount - Current Year",
                "Amount - Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Investments in partnership firms - Quoted",
              disclosures: [
                "Company Name",
                "Equity Shares - Current Year",
                "Equity Shares - Previous Year",
                "Amount - Current Year",
                "Amount - Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Investments in partnership firms - Unquoted",
              disclosures: [
                "Company Name",
                "Equity Shares - Current Year",
                "Equity Shares - Previous Year",
                "Amount - Current Year",
                "Amount - Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Impairment of Investment",
              disclosures: [
                "Company Name",
                "Equity Shares - Current Year",
                "Equity Shares - Previous Year",
                "Amount - Current Year",
                "Amount - Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Trade Receivables",
          notes_no: "6(b)",
          disclosures: true,
          sub_grp: [
            {
              sub_grp: "Considered good – Secured",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Considered good – Unsecured",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },

            {
              sub_grp:
                "Trade Receivables which have significant increase in credit risk",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Trade Receivables – credit impaired",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Loss allowance - Trade receivable",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Loans",
          notes_no: "6(c)",
          disclosures: true,
          sub_grp: [
            {
              sub_grp: "Loan to Associates",
              disclosures: [
                "Loans Considered Good - Secured",
                "Loans Considered Good - Unsecured",
                "Loans which have significant increase in credit risk",
                "Loans - Credit Impaired",
                "Loss Allowance",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Loan to Subsidiary",
              disclosures: [
                "Loans Considered Good - Secured",
                "Loans Considered Good - Unsecured",
                "Loans which have significant increase in credit risk",
                "Loans - Credit Impaired",
                "Loss Allowance",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Loan to Joint venture",
              disclosures: [
                "Loans Considered Good - Secured",
                "Loans Considered Good - Unsecured",
                "Loans which have significant increase in credit risk",
                "Loans - Credit Impaired",
                "Loss Allowance",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Loan to Directors",
              disclosures: [
                "Loans Considered Good - Secured",
                "Loans Considered Good - Unsecured",
                "Loans which have significant increase in credit risk",
                "Loans - Credit Impaired",
                "Loss Allowance",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Loan to Employees",
              disclosures: [
                "Loans Considered Good - Secured",
                "Loans Considered Good - Unsecured",
                "Loans which have significant increase in credit risk",
                "Loans - Credit Impaired",
                "Loss Allowance",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Loans receivable - credit impaired",
              disclosures: [
                "Loans Considered Good - Secured",
                "Loans Considered Good - Unsecured",
                "Loans which have significant increase in credit risk",
                "Loans - Credit Impaired",
                "Loss Allowance",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Other Financial Assets",
          notes_no: "6(e)",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Security deposits",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Bank deposit with more than 12 months",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Foreign Exchange forward contracts",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Foreign currency options",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Interest rate swaps",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Indemnification Asset",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Deferred tax assets",
          notes_no: "7",
          disclosures: true,
          sub_grp: [
            {
              sub_grp: "Deferred tax assets (net)",
              disclosures: [
                "Charged / credited to profit or loss",
                "Charged / credited to other comprehensive income",
                "Charged / credited to deferred tax on basis adjustment",
                "Acquisition of subsidiary",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Other non-current Assets",
          notes_no: "8",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Capital Advances",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Assets recognized from costs incurred to fulfil a contract",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Advances other than capital advances",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Advance to associates",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Advance to Subsidiary",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Advance to Joint venture",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Advance to employees",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Advances to suppliers",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "GST recoverable",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
      ],
    },
    {
      fs_grp: "Current Assets",
      notes_grp: [
        {
          notes_grp: "Investments",
          notes_no: "6(a)",
          disclosures: true,
          sub_grp: [
            {
              sub_grp: "Investments in Equity Instruments - Quoted",
              disclosures: [
                "Company Name",
                "Equity Shares - Current Year",
                "Equity Shares - Previous Year",
                "Amount - Current Year",
                "Amount - Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Investments in Equity Instruments - Unquoted",
              disclosures: [
                "Company Name",
                "Equity Shares - Current Year",
                "Equity Shares - Previous Year",
                "Amount - Current Year",
                "Amount - Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Investments in Preference Shares - Quoted",
              disclosures: [
                "Company Name",
                "Equity Shares - Current Year",
                "Equity Shares - Previous Year",
                "Amount - Current Year",
                "Amount - Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Investments in Preference Shares - Unquoted",
              disclosures: [
                "Company Name",
                "Equity Shares - Current Year",
                "Equity Shares - Previous Year",
                "Amount - Current Year",
                "Amount - Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Investments in Government or trust securities - Quoted",
              disclosures: [
                "Company Name",
                "Equity Shares - Current Year",
                "Equity Shares - Previous Year",
                "Amount - Current Year",
                "Amount - Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Investments in Government or trust securities - Unquoted",
              disclosures: [
                "Company Name",
                "Equity Shares - Current Year",
                "Equity Shares - Previous Year",
                "Amount - Current Year",
                "Amount - Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Investment in debentures and bonds - Quoted",
              disclosures: [
                "Company Name",
                "Equity Shares - Current Year",
                "Equity Shares - Previous Year",
                "Amount - Current Year",
                "Amount - Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Investment in debentures and bonds - Unquoted",
              disclosures: [
                "Company Name",
                "Equity Shares - Current Year",
                "Equity Shares - Previous Year",
                "Amount - Current Year",
                "Amount - Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Investment in mutual funds - Quoted",
              disclosures: [
                "Company Name",
                "Equity Shares - Current Year",
                "Equity Shares - Previous Year",
                "Amount - Current Year",
                "Amount - Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Investment in mutual funds - Unquoted",
              disclosures: [
                "Company Name",
                "Equity Shares - Current Year",
                "Equity Shares - Previous Year",
                "Amount - Current Year",
                "Amount - Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Investments in partnership firms - Quoted",
              disclosures: [
                "Company Name",
                "Equity Shares - Current Year",
                "Equity Shares - Previous Year",
                "Amount - Current Year",
                "Amount - Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Investments in partnership firms - Unquoted",
              disclosures: [
                "Company Name",
                "Equity Shares - Current Year",
                "Equity Shares - Previous Year",
                "Amount - Current Year",
                "Amount - Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Impairment of Investment",
              disclosures: [
                "Company Name",
                "Equity Shares - Current Year",
                "Equity Shares - Previous Year",
                "Amount - Current Year",
                "Amount - Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Trade Receivables",
          notes_no: "6(b)",
          disclosures: [
            "Trade Receivables Considered Good - Secured",
            "Trade Receivables Considered Good - Unsecured",
            "Trade Receivables which have significant increase in credit risk",
            "Trade Receivables - Credit Impaired",
            "Loss Allowance",
          ],
          sub_grp: [
            {
              sub_grp: "Considered good – Secured",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Considered good – Unsecured",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Trade Receivables which have significant increase in credit risk",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Trade Receivables – credit impaired",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Loss allowance - Trade receivable",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Cash and cash equivalents",
          notes_no: "6(d)",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Balances with banks in current accounts",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Balances with banks in EEFC accounts",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Cheques on hand , Draft on hand",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Deposits with maturity of less than 3 months",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Cash on hand",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Bank balances other above",
          notes_no: "",
          disclosures: true,
          sub_grp: [
            {
              sub_grp: "Balances with banks in current accounts",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Other financial assets",
          notes_no: "6(e)",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Foreign Exchange forward contracts",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Foreign currency options",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Interest rate swaps",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Indemnification Asset",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Loans",
          notes_no: "6(c)",
          disclosures: [
            "Loans Considered Good - Secured",
            "Loans Considered Good - Unsecured",
            "Loans which have significant increase in credit risk",
            "Loans - Credit Impaired",
            "Loss Allowance",
          ],
          sub_grp: [
            {
              sub_grp: "Loan to Associates",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Loan to Directors",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Loan to Employees",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Loan to Subsidiary",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Loan to Joint venture",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Loan to others",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Inventories",
          notes_no: "9",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Raw materials",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Work-in-progress/Changes in inventories of work-in-progress, stock-in-trade and finished goods",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Finished goods/Changes in inventories of work-in-progress, stock-in-trade and finished goods",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Traded goods/Changes in inventories of work-in-progress, stock-in-trade and finished goods",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Stores and spares",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Other current assets",
          notes_no: "10",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Prepaid expenses",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Balance with statutory authories",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Contract assets relating to IT consulting contracts",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Loss allowance - Contract assets",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp:
            "Assets held-for-sale / Assets included in disposal group(s) held-for-sale",
          notes_no: "11",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Building",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Current tax assets",
          notes_no: "11(a)",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Current tax assets (net)",
              disclosures: [],
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
      ],
    },
    {
      fs_grp: "Non Current Liabilities",
      notes_grp: [
        {
          notes_grp: "Financial Liabilities - Borrowings",
          notes_no: "13(a)",
          disclosures: [
            "Less: Current maturities of long term debt",
            "Less: Current maturities of finance lease obligations",
            "Less: Interest accrued",
          ],
          sub_grp: [
            {
              sub_grp: "Debentures",
              disclosures: [
                "Borrowings",
                "Maturity Date",
                "Terms of repayment",
                "Coupon / interest rate",
                "Current Year",
                "Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Term loans-Rupee loan",
              disclosures: [
                "Borrowings",
                "Maturity Date",
                "Terms of repayment",
                "Coupon / interest rate",
                "Current Year",
                "Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Term loans-Foreign currency loan",
              disclosures: [
                "Borrowings",
                "Maturity Date",
                "Terms of repayment",
                "Coupon / interest rate",
                "Current Year",
                "Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Term loans-Other parties",
              disclosures: [
                "Borrowings",
                "Maturity Date",
                "Terms of repayment",
                "Coupon / interest rate",
                "Current Year",
                "Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Long-term maturities of finance lease obligations",
              disclosures: [
                "Borrowings",
                "Maturity Date",
                "Terms of repayment",
                "Coupon / interest rate",
                "Current Year",
                "Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Bonds",
              disclosures: [
                "Borrowings",
                "Maturity Date",
                "Terms of repayment",
                "Coupon / interest rate",
                "Current Year",
                "Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Vehicles loans",
              disclosures: [
                "Borrowings",
                "Maturity Date",
                "Terms of repayment",
                "Coupon / interest rate",
                "Current Year",
                "Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Deferred payment liabilities",
              disclosures: [
                "Borrowings",
                "Maturity Date",
                "Terms of repayment",
                "Coupon / interest rate",
                "Current Year",
                "Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Loan from related parties",
              disclosures: [
                "Borrowings",
                "Maturity Date",
                "Terms of repayment",
                "Coupon / interest rate",
                "Current Year",
                "Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Liability component of compound financial instruments",
              disclosures: [
                "Borrowings",
                "Maturity Date",
                "Terms of repayment",
                "Coupon / interest rate",
                "Current Year",
                "Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Other loans",
              disclosures: [
                "Borrowings",
                "Maturity Date",
                "Terms of repayment",
                "Coupon / interest rate",
                "Current Year",
                "Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Financial liabilities - Other Financial Liabilities",
          notes_no: "13(b)",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Principal swap",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Lease liabilities",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Financial Liabilities - Trade payable",
          notes_no: "13(c)",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Trade payables: micro and small enterprises",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Trade payables: others",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Trade payables to related parties",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Provisions",
          notes_no: "14",
          disclosures: true,
          sub_grp: [
            {
              sub_grp: "Service warranties",
              disclosures: [
                "Acquired through business combination",
                "Charged/credited to profit or loss - additional provisions recognised",
                "charged / credited to profit or loss - unused amounts reversed",
                "charged / credited to profit or loss - unwinding of discount",
                "Amounts used during the year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Legal claim",
              disclosures: [
                "Acquired through business combination",
                "Charged/credited to profit or loss - additional provisions recognised",
                "charged / credited to profit or loss - unused amounts reversed",
                "charged / credited to profit or loss - unwinding of discount",
                "Amounts used during the year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Restructuring costs",
              disclosures: [
                "Acquired through business combination",
                "Charged/credited to profit or loss - additional provisions recognised",
                "charged / credited to profit or loss - unused amounts reversed",
                "charged / credited to profit or loss - unwinding of discount",
                "Amounts used during the year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Other provision",
              disclosures: [
                "Acquired through business combination",
                "Charged/credited to profit or loss - additional provisions recognised",
                "charged / credited to profit or loss - unused amounts reversed",
                "charged / credited to profit or loss - unwinding of discount",
                "Amounts used during the year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Employee benefit obligations - Leave encashments",
              disclosures: [
                "Acquired through business combination",
                "Charged/credited to profit or loss - additional provisions recognised",
                "charged / credited to profit or loss - unused amounts reversed",
                "charged / credited to profit or loss - unwinding of discount",
                "Amounts used during the year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Employee benefit obligations - Share-appreciation rights",
              disclosures: [
                "Acquired through business combination",
                "Charged/credited to profit or loss - additional provisions recognised",
                "charged / credited to profit or loss - unused amounts reversed",
                "charged / credited to profit or loss - unwinding of discount",
                "Amounts used during the year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Employee benefit obligations - Defined pension benefits",
              disclosures: [
                "Acquired through business combination",
                "Charged/credited to profit or loss - additional provisions recognised",
                "charged / credited to profit or loss - unused amounts reversed",
                "charged / credited to profit or loss - unwinding of discount",
                "Amounts used during the year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Employee benefit obligations - Post-employment medical benefits",
              disclosures: [
                "Acquired through business combination",
                "Charged/credited to profit or loss - additional provisions recognised",
                "charged / credited to profit or loss - unused amounts reversed",
                "charged / credited to profit or loss - unwinding of discount",
                "Amounts used during the year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Employee benefit obligations - Gratuity",
              disclosures: [
                "Acquired through business combination",
                "Charged/credited to profit or loss - additional provisions recognised",
                "charged / credited to profit or loss - unused amounts reversed",
                "charged / credited to profit or loss - unwinding of discount",
                "Amounts used during the year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Other employee benefit obligations",
              disclosures: [
                "Acquired through business combination",
                "Charged/credited to profit or loss - additional provisions recognised",
                "charged / credited to profit or loss - unused amounts reversed",
                "charged / credited to profit or loss - unwinding of discount",
                "Amounts used during the year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Deferred tax liabilities (net)",
          notes_no: "16",
          disclosures: true,
          sub_grp: [
            {
              sub_grp: "Deferred tax liabilities (net)",
              disclosures: [
                "Charged/credited to profit or loss - additional provisions recognised",
                "charged / credited to other comprehensive income",
                "charged / credited to transfer from other reserves to retained earnings",
                "charged / credited directly to equity",
                "Acquisition of subsidary",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Government grants",
          notes_no: "18",
          disclosures: [
            "Opening balance",
            "Grants during the year",
            "Less: released to profit or loss",
          ],
          sub_grp: [
            {
              sub_grp: "Government grants",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Other Non-Current Liabilities",
          notes_no: "18(b)",
          disclosures: [],
          sub_grp: [
            {
              sub_grp: "Other Non-Current Liabilities",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
      ],
    },
    {
      fs_grp: "Current Liabilities",
      notes_grp: [
        {
          notes_grp: "Financial Liabilities - Borrowings",
          notes_no: "13(a)",
          disclosures: [
            "Less: Current maturities of long term debt",
            "Less: Current maturities of finance lease obligations",
            "Less: Interest accrued",
          ],
          sub_grp: [
            {
              sub_grp: "Debentures",
              disclosures: [
                "Borrowings",
                "Maturity Date",
                "Terms of repayment",
                "Coupon / interest rate",
                "Current Year",
                "Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Term loans-Rupee loan",
              disclosures: [
                "Borrowings",
                "Maturity Date",
                "Terms of repayment",
                "Coupon / interest rate",
                "Current Year",
                "Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Term loans-Foreign currency loan",
              disclosures: [
                "Borrowings",
                "Maturity Date",
                "Terms of repayment",
                "Coupon / interest rate",
                "Current Year",
                "Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Term loans-Other parties",
              disclosures: [
                "Borrowings",
                "Maturity Date",
                "Terms of repayment",
                "Coupon / interest rate",
                "Current Year",
                "Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Working capital loan",
              disclosures: [
                "Borrowings",
                "Maturity Date",
                "Terms of repayment",
                "Coupon / interest rate",
                "Current Year",
                "Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Vehicles loan",
              disclosures: [
                "Borrowings",
                "Maturity Date",
                "Terms of repayment",
                "Coupon / interest rate",
                "Current Year",
                "Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Bonds",
              disclosures: [
                "Borrowings",
                "Maturity Date",
                "Terms of repayment",
                "Coupon / interest rate",
                "Current Year",
                "Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Loan from related parties",
              disclosures: [
                "Borrowings",
                "Maturity Date",
                "Terms of repayment",
                "Coupon / interest rate",
                "Current Year",
                "Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Other loans",
              disclosures: [
                "Borrowings",
                "Maturity Date",
                "Terms of repayment",
                "Coupon / interest rate",
                "Current Year",
                "Previous Year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Other Current liabilities",
          notes_no: "19",
          disclosures: true,
          sub_grp: [
            {
              sub_grp: "Payroll taxes",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Revenue received in advance",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Refund liabilities",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "GST payable",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Other statutory tax payables",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Other financial liabilities",
          notes_no: "13(b)",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Foreign-exchange forward contracts",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Principal swap",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Current maturities of finance lease obligations",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Interest accrued",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Unpaid dividend",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Unpaid matured deposits and interest accured thereon",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Capital creditors",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Application money received for allotment of securities to the extent refundable and interest accured thereon",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Financial liabilties - Trade payables",
          notes_no: "13(c)",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Trade payables - micro and small enterprises",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Trade payables - others",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Trade payables - related parties",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Provisions",
          notes_no: "14",
          disclosures: true,
          sub_grp: [
            {
              sub_grp: "Service warranties",
              disclosures: [
                "Acquired through business combination",
                "Charged/credited to profit or loss - additional provisions recognised",
                "charged / credited to profit or loss - unused amounts reversed",
                "charged / credited to profit or loss - unwinding of discount",
                "Amounts used during the year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Legal claim",
              disclosures: [
                "Acquired through business combination",
                "Charged/credited to profit or loss - additional provisions recognised",
                "charged / credited to profit or loss - unused amounts reversed",
                "charged / credited to profit or loss - unwinding of discount",
                "Amounts used during the year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Restructuring costs",
              disclosures: [
                "Acquired through business combination",
                "Charged/credited to profit or loss - additional provisions recognised",
                "charged / credited to profit or loss - unused amounts reversed",
                "charged / credited to profit or loss - unwinding of discount",
                "Amounts used during the year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Other provision",
              disclosures: [
                "Acquired through business combination",
                "Charged/credited to profit or loss - additional provisions recognised",
                "charged / credited to profit or loss - unused amounts reversed",
                "charged / credited to profit or loss - unwinding of discount",
                "Amounts used during the year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Employee benefit obligations - Leave encashments",
              disclosures: [
                "Acquired through business combination",
                "Charged/credited to profit or loss - additional provisions recognised",
                "charged / credited to profit or loss - unused amounts reversed",
                "charged / credited to profit or loss - unwinding of discount",
                "Amounts used during the year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Employee benefit obligations - Share-appreciation rights",
              disclosures: [
                "Acquired through business combination",
                "Charged/credited to profit or loss - additional provisions recognised",
                "charged / credited to profit or loss - unused amounts reversed",
                "charged / credited to profit or loss - unwinding of discount",
                "Amounts used during the year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Employee benefit obligations - Defined pension benefits",
              disclosures: [
                "Acquired through business combination",
                "Charged/credited to profit or loss - additional provisions recognised",
                "charged / credited to profit or loss - unused amounts reversed",
                "charged / credited to profit or loss - unwinding of discount",
                "Amounts used during the year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Employee benefit obligations - Post-employment medical benefits",
              disclosures: [
                "Acquired through business combination",
                "Charged/credited to profit or loss - additional provisions recognised",
                "charged / credited to profit or loss - unused amounts reversed",
                "charged / credited to profit or loss - unwinding of discount",
                "Amounts used during the year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Employee benefit obligations - Gratuity",
              disclosures: [
                "Acquired through business combination",
                "Charged/credited to profit or loss - additional provisions recognised",
                "charged / credited to profit or loss - unused amounts reversed",
                "charged / credited to profit or loss - unwinding of discount",
                "Amounts used during the year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Other employee benefit obligations",
              disclosures: [
                "Acquired through business combination",
                "Charged/credited to profit or loss - additional provisions recognised",
                "charged / credited to profit or loss - unused amounts reversed",
                "charged / credited to profit or loss - unwinding of discount",
                "Amounts used during the year",
              ],
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Current tax liabilities",
          notes_no: "17",
          disclosures: [
            "Opening balance",
            "Add: current tax payable for the year",
            "Less: taxes paid",
          ],
          sub_grp: [
            {
              sub_grp: "Current tax liabilities",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Government grants",
          notes_no: "18",
          disclosures: [
            "Opening balance",
            "Grants during the year",
            "Less: released to profit or loss",
          ],
          sub_grp: [
            {
              sub_grp: "Government grants",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp:
            "Liabilities directly associated with assets classified as held for sale",
          notes_no: "33",
          disclosures: true,
          sub_grp: [
            {
              sub_grp: "Trade payables",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Other current liabilities",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Contract liabilities",
          notes_no: "18A",
          disclosures: [],
          sub_grp: [
            {
              sub_grp: "Contract liabilities – IT consulting contracts",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Contract liabilities – customer loyalty programme",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
      ],
    },
    {
      fs_grp: "Income",
      notes_grp: [
        {
          notes_grp: "Revenue from operations",
          notes_no: "20",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Sale of products",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Sale of service",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Other operating revenue",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Other Income",
          notes_no: "21(a)",
          disclosures: true,
          sub_grp: [
            {
              sub_grp: "Rental Income",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Dividend income",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Interest income",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Unwinding of discount on security deposits",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Government grants",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Other gains/(losses) – net",
          notes_no: "21(b)",
          disclosures: true,
          sub_grp: [
            {
              sub_grp: "Net gain on disposal of property plants and equipments",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Net fair value gains on fair value changes",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Net gain on sale of investments",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Net fair value losses on derivatives not designated as hedges",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Changes in fair value of contingent consideration",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Net foreign exchange differences",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Other Items",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp:
            "Net gain on de-recognition of financial assets at amortized cost",
          notes_no: "21(c)",
          disclosures: false,
          sub_grp: [
            {
              sub_grp:
                "Net gain on de-recognition of financial assets at amortized cost",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Net gain on reclassification of Financial assets",
          notes_no: "21(d)",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Net gain on reclassification of Financial assets",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
      ],
    },
    {
      fs_grp: "Expenses",
      notes_grp: [
        {
          notes_grp: "Cost of material consumed",
          notes_no: "22(a)",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Cost of materials consumed",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Purchases of stock in-trade",
          notes_no: "22(c)",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Purchases of stock-in-trade",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Employee benefit expense",
          notes_no: "23",
          disclosures: true,
          sub_grp: [
            {
              sub_grp: "Salary, wages and bonus",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Contribution to Provident fund",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Employee Share - based payment expense",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Gratuity",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Leave compensation",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Post employment pension benefits",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Post employment medical benefits",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Staff welfare expenses",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Depreciation and Amortisation expense",
          notes_no: "24",
          disclosures: true,
          sub_grp: [
            {
              sub_grp: "Depreciation of property plant and equipment",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Depreciation on Investment properties",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Amortisation of Intangible assets",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Depreciation of ROU assets",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Impairment of goodwill and other non-current assets",
          notes_no: "3,5",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Impairment of goodwill",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Net impairment losses on financial and contract assets",
          notes_no: "29",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Net impairment losses on financial and contract assets",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Other Expenses",
          notes_no: "25",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Consumption of stores and spare",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Repairs and maintenance",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Plant and machinery",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Buildings",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Others",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Telephone and communication charges",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Water and electricity charges",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Rental charges",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Rates and taxes",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Legal and professional fees",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Travel and conveyance",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Insurance",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Printing and stationary",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Sales commission",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Brokerage and commison",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Provisions",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Legal claims",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Corporate social responsibility",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Payment to auditors",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Miscellaneous expenses",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Finance costs",
          notes_no: "26",
          disclosures: true,
          sub_grp: [
            {
              sub_grp: "Interest expenses - Term loan",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Interest expenses - Working capital",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Interest expenses - Related party",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Interest expenses - Non Convertible Debentures",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Interest expenses - Convertible Debentures",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Interest expenses - Bonds",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Finance charges on lease liabilities",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Dividend on redeemable preference shares",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Exchange differences regarded as an adjustment to borrowing costs",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Unwinding of discount on financial liabilities",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Fair value changes on interest rate swaps designated as cash flow hedges – transfer from OCI",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Current tax",
          notes_no: "27",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Current tax",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Deferred tax",
          notes_no: "28",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Deferred tax",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
      ],
    },
    {
      fs_grp: "Exceptional items",
      notes_grp: [
        {
          notes_grp: "Exceptional items",
          notes_no: "30",
          disclosures: false,
          sub_grp: [],
        },
      ],
    },
    {
      fs_grp: "Profit / (loss) from discontinued operations",
      notes_grp: [
        {
          notes_grp: "Profit / (loss) from discontinued operations",
          notes_no: "31",
          disclosures: false,
          sub_grp: [],
        },
      ],
    },
    {
      fs_grp: "Other Comprehensive Income",
      notes_grp: [
        {
          notes_grp:
            "Items that will not be reclassified to profit or loss and their related income tax effects",
          notes_no: "12",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Changes in revaluation surplus",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Re-measurements of the defined benefit plans",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Fair value changes on Equity Instruments through other comprehensive income",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Fair value changes relating to own credit risk of financial liabilities designated at fair value through profit or loss",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Share of Other Comprehensive Income in Associates and Joint Ventures, to the extent not to be classified into profit or loss",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp:
            "Items that will be reclassified to profit or loss and its related income tax effects",
          notes_no: "12",
          disclosures: false,
          sub_grp: [
            {
              sub_grp:
                "Exchange differences in translating the financial statements of a foreign operation",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Fair value changes in Debt Instruments through other comprehensive income",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "The effective portion of gain and loss on hedging instruments in a cash flow hedge",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp:
                "Share of Other Comprehensive Income in Associates and Joint Ventures, to the extent to be classified into profit or loss",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
      ],
    },
    {
      fs_grp: "Equity share capital",
      notes_grp: [
        {
          notes_grp: "Equity share capital",
          notes_no: "40",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Equity share capital",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
      ],
    },
    {
      fs_grp: "Instruments entirely equity in nature",
      notes_grp: [
        {
          notes_grp: "Instruments entirely equity in nature",
          notes_no: "41",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Instruments entirely equity in nature",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
      ],
    },
    {
      fs_grp: "Non-controlling interests",
      notes_grp: [
        {
          notes_grp: "Non-controlling interests",
          notes_no: "39",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Reserves and surplus",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
      ],
    },
    {
      fs_grp: "Other equity",
      notes_grp: [
        {
          notes_grp: "Share application money pending allotment",
          notes_no: "35",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Share application money pending allotment",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Equity component of compound financial instruments",
          notes_no: "36",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Equity component of compound financial instruments",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Reserves and surplus",
          notes_no: "37",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Reserves and surplus",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Capital Reserve",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Securities Premium Reserve",
              cy_amt: 0,
              py_amt: 0,
            },
            {
              sub_grp: "Retained earnings",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Debt instruments through Other Comprehensive Income",
          notes_no: "38",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Debt instruments through Other Comprehensive Income",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Equity instruments through Other Comprehensive Income",
          notes_no: "38A",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Equity instruments through Other Comprehensive Income",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Effective portion of Cash Flow Hedges ",
          notes_no: "38B",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Effective portion of Cash Flow Hedges ",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Revaluation Surplus",
          notes_no: "38C",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Revaluation Surplus",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp:
            "Exchange differences on translating the financial statements of a foreign operation",
          notes_no: "38D",
          disclosures: false,
          sub_grp: [
            {
              sub_grp:
                "Exchange differences on translating the financial statements of a foreign operation",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Money received against share warrant",
          notes_no: "38E",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Money received against share warrant",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
        {
          notes_grp: "Attributable to owners of the parent",
          notes_no: "38F",
          disclosures: false,
          sub_grp: [
            {
              sub_grp: "Attributable to owners of the parent",
              cy_amt: 0,
              py_amt: 0,
            },
          ],
        },
      ],
    },
  ],
};

const initialState = {
  projectId: null,
  profileName: "",
  profileImage: "",
  profileEmail: "",
  auth_token: null,
  tb_id: "",
  tableData: [],
  fileData: [],
  filter: [],
  sheetData: [],
  groupingData: [],
  projectData: [],
  selectedRows: [],
  deletedData: "",
  currentClassification: "",
  currentClassificationName: "",
  note: "",
  blNoteNo: "",
  plNoteNo: "",
  grouping: groupings,
  render: "",
  eventData: [],
  // eventCY:null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_RESTART:
      console.log(action.payload, "clear the state variable ");
      return {
        ...state,
        auth_token: null,
        tb_id: "",
        tableData: [],
        fileData: [],
        filter: [],
        sheetData: [],
        groupingData: [],
        projectData: [],
        selectedRows: [],
        deletedData: "",
        currentClassification: "",
        currentClassificationName: "",
        note: "",
        blNoteNo: "",
        plNoteNo: "",
        grouping: groupings,
        render: "",
        // eventData:"",
        // eventCY:"",
      };

    case actionTypes.SET_PROJECT_ID:
      console.log(action.payload, "payload");
      return {
        ...state,
        projectId: action.payload.data.data._id,
      };
    case actionTypes.SET_RENDERNOW:
      console.log(action.payload, "payload");
      return {
        ...state,
        render: action.payload,
      };
    case actionTypes.SET_BLNO:
      console.log(action.payload, "payload");
      return {
        ...state,
        blNoteNo: action.payload,
      };
    case actionTypes.SET_PLNO:
      console.log(action.payload, "payload");
      return {
        ...state,
        plNoteNo: action.payload,
      };
    case actionTypes.SET_PROFILE_NAME:
      console.log(action.payload, "payload");
      return {
        ...state,
        profileName: action.payload,
      };
    case actionTypes.SET_PROFILE_IMAGE:
      console.log(action.payload, "payload");
      return {
        ...state,
        profileImage: action.payload,
      };
    case actionTypes.SET_PROFILE_EMAIL:
      console.log(action.payload, "payload");
      return {
        ...state,
        profileEmail: action.payload,
      };
    case actionTypes.SET_AUTH:
      console.log(action.payload, "payload");
      return {
        ...state,
        auth_token: action.payload.data.token,
      };
    case actionTypes.SET_TB_ID:
      console.log(action.payload, "payload TB_ID");
      return {
        ...state,
        tb_id: action.payload,
      };
    case actionTypes.SET_TABLE_DATA:
      console.log(action.payload, "payload -------------- TABLE_DATA");
      return {
        ...state,
        tableData: action.payload,
      };
    // case actionTypes.SET_TABLE_DATA:
    //     console.log(action.payload,'payload -------------- TABLE_DATA')
    //     return{
    //         ...state,
    //         tableData: action.payload.data.line_items

    //     }
    case actionTypes.SET_FILTER:
      console.log(action.payload, "payload -------------- TABLE_DATA");
      return {
        ...state,
        filter: action.payload,
      };
    // case actionTypes.SET_FILE_DATA:
    //     console.log(action.payload,'payload -------------- TABLE_DATA')
    //     return{
    //         ...state,
    //         tableData: action.payload.data.line_items

    //     }
    case actionTypes.SET_FILE_DATA_SHEET:
      console.log(action.payload, "payload -------------- TABLE_DATA");
      return {
        ...state,
        sheetData: action.payload,
      };
    case actionTypes.SET_DELET_ROW:
      console.log(action.payload, "payload -------------- SET_DELET_ROW");
      console.log(state.tableData, "table data");
      // const value = state.tableData.map((row)=>{
      //     if(row.lid === action.payload[0].lid ){
      //         return null
      //     }
      //     return row

      // })
      // console.log( value , 'here is the value')
      const result = state.tableData.filter(
        (row) => row.lid !== action.payload[0].lid
      );
      console.log(result, "this uses filter function");
      return {
        ...state,
        tableData: result,
      };
    case actionTypes.SET_RESTORE_ROW:
      console.log(action.payload, "payload -------------- SET_RESTORE_ROW");
      const value = action.payload;
      return {
        ...state,
        tableData: state.tableData.concat(value),
      };
    case actionTypes.SET_DELETED_ROW:
      console.log(action.payload, "payload -------------- SET_RESTORE_ROW");
      return {
        ...state,
        deletedData: action.payload.data,
      };
    case actionTypes.SET_CLASSIFICATION:
      console.log(action.payload, "payload ------------ CLASSIFICATION_DATA");
      return {
        ...state,
        currentClassification: action.payload,
      };
    case actionTypes.SET_CLASSIFICATIONNAME:
      console.log(action.payload, "payload ------------ CLASSIFICATION_DATA");
      return {
        ...state,
        currentClassificationName: action.payload,
      };
    case actionTypes.SET_NOTE4:
      console.log(action.payload, "payload ------------ NOTE_4");
      return {
        ...state,
        note: action.payload,
      };
    case actionTypes.SET_GROUPINGS:
      console.log(
        action.payload.original,
        "payload ------------ GROUPINGS_DATA"
      );
      return {
        // ...state,
        // groupingData: action.payload
      };
    case actionTypes.SET_EDITSUBGROUPING:
      console.log(action.payload, "payload ------------ GROUPINGS_DATA");
      return {
        ...state,
        grouping: action.payload,
      };
    // chinmay
    case actionTypes.SET_SENDDATA:
      console.log(action.payload, "payload ------------ SET_SENDDATA");
      return {
        ...state,
        eventData: action.payload,
      };

    // case actionTypes.SET_PROGRESSBAR_DATA:
    //   console.log(action.payload, "payload ------------ SET_PROGRESSBAR_DATA");
    //   return {
    //     ...state,
    //     grouping: action.payload,
    //   };

    // case actionTypes.SET_SENDCY:
    //   console.log(action.payload, "payload ------------ SET_SENDCY");
    //   return {
    //     ...state,
    //     eventCY: action.payload,
    //   };
    //end chinmay
    case actionTypes.SET_PROJECT_DATA:
      console.log(
        action.payload.original,
        "payload ------------ GROUPINGS_DATA"
      );
      return {
        ...state,
        projectData: action.payload,
      };
    case actionTypes.SET_SELECTEDROWS:
      console.log(action.payload, "payload ------------ SET_SELECTEDROWS");
      return {
        ...state,
        selectedRows: action.payload,
      };
    case actionTypes.SET_EDITGROUPING:
      console.log(action.payload, "payload ------------ EDITGROUPINGS_DATA");
      // var found = state.tableData.find(function (element) {element.lid === action.payload.lid})
      const table = state.currentClassification;
      const index = table.findIndex((line) => line.lid === action.payload.lid);
      // console.log(index,'ress')
      // console.log(table[index],'ness_ress')
      table[index].fs_grp = action.payload.fs_grp;
      table[index].note_grp = action.payload.note_grp;
      table[index].sub_grp = action.payload.sub_grp;
      console.log(table, "after ress");

      // const ress = table.find((line) => line.lid === action.payload.lid );
      // const contents = action.payload.contents
      // const field = Object.keys(contents)
      // const replace = state.currentClassification
      // field.map((v) => { ress[v] = contents[v] })
      // let index = state.currentClassification.findIndex((value) => value.lid === action.payload.lid )
      // console.log(index,'here here')
      // replace[index] =  ress
      // replace.map((arr) =>{
      //     if(arr.lid === action.payload.lid){
      //        return (arr = ress)
      //     }
      //     return
      //  })
      //  console.log(replace,'replace after')
      // console.log(ress,'after')

      return {
        ...state,
        currentClassification: table,
      };

    default:
      return state;
  }
};
export default reducer;
