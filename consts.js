
const {
    NEXT_PUBLIC_GOOGLE_SHEETS_PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCjnbpwfR3iM1E4\nTbO17mNUizhvOQi/Qe3oeEylgGAVxbBGozMthJUBmJIeJAncJrPj5i3OHrgBrZXk\n0Pl72vSyHC15bWzqbEWCbYe/lLs37wcNiv/lcfDyMQfs+Aeku1wOtiqBYF49uLwa\nSZjNFO8zenJbfZYvoZWv4FIjQzJWc5TW8bScJ15G+gDERAhDZxT98n23yFQpdIu7\nJoLOT+cr8/YE6aMrIgIPY/J0HKsxoskHYdqXMZeIMannAVu5EAU9tYQcnHVFl6e2\n1HXodTLV/ivh6a7Nub/uanNxTpTpmbCg633NCo/kmF9pAqYLMWH/noiI9cbiUIc0\nWBZ7YNjZAgMBAAECggEADTQflU/Xf0deZNGKcOJbxDkW9QzQeqS+pv28S7fUKTWi\nn9SwPtpd7vrJweJtJEXASyIqbKGYflQsjkJZ+8eD6zKwbcXpnfJeWqPtqkV9pUom\nEs72jyTWiajwx4wNi9rt1ycWv4mQGWGE1oc9bEFl+0zEmUMFgXMEAiUzY7Kax5Sb\nqva6RNWN9CxTIBG8T1Mw87lXYmmyxp5pT5pGGXjG/j5/O77ZD47MkvAHUKocKZsu\n4uTrkU7Q/GKNyZ7g755OYZX1mURw3s4oMMa+QaDqL2hn+ZKEs2L2cuRNBtrpBjlT\nIR8irk4N0ATvnF1v/OJZqCKyjlxOY3NYb7tj7tZzYQKBgQDWhZb/lZcNAwnrpuY2\npiDMaCmGaqbpH+7U7eLvDXg8eJtNa5oGh5MRzpVk/Ze8mKIIHpXY/RjfCOkGcvyv\n5zIOBhr6NbXCyKYkMLt5upgszSP8P19fUkX+u9vT39JujZdSE2TNtIy46AyKW9RQ\nlLnE4bkY95/3bGLLipj+j8hOEQKBgQDDQGfZjljnhsubdG3PbuchfYg+aFFdqYPI\nAkybYJJUMDf5dYxSFpYuQpfFQIcLxnNEZZTQkbEe3P5BpKgnsxHqffSWKVvanZ1+\n4VTZEVtbSKIRC1MUZZoGyUPUeqczEjxdfZN56/KruKimoQS8t+4kgVaoNd6EaLDV\nWZ74Dxs2SQKBgGmbNF24P7dJIq4e6MBIgmb+dErW4Dpt3P536brzb5idax7u9NF4\nFp+yintAGF3g6guDOxOqbX8G/OiO3PSfpVWgDdHVdRhh/OBeGTzw7g9IIgoBDKt5\nbjncM3kXe5mvHKpsH7jgxFIW8m1+jYPp45YX5S50YQzGD9DR90WCdQJxAoGAH8zz\nnRl0HXF05ALYh7p2Zpv9frya0/hyADdvprbZ3mBkHXspuYz4NNyfv369AAv4ZiFt\nVXMFOBOiTaq1wJGHz3toRLTDwx18s1eb7CbJjFqOGtyPUXki1wwcwhSf+s9ziX6U\ncH0fbxyKS2laTipe3Q87v/XWIhazBmysWZaMRhECgYB4CPRYCnz/F/TjRk9lyQUv\nLWgn89QNxi0NPb8JSAAjCyVC6+YcAlRl3QfAHBPY+C8BR+II6JF5fwZv4qe9E8l3\nqGefMhBPgCE4JyzHRCbSipHN4Lut5PAMa5BAT9atbS6LOzk/wWpAs9d2LXE89mt4\nrEq41sBfgDTG7lo7bKH2ww==\n-----END PRIVATE KEY-----\n',
    NEXT_PUBLIC_SPREADSHEET_ID = '1W4vN_3sWS-LI2JWrcUrkpuITcHYusCdF2fWKk1GDAtY',
    NEXT_PUBLIC_GOOGLE_SHEETS_CLIENT_EMAIL = 'high-demand-parts@high-demand-parts.iam.gserviceaccount.com',
    NEXT_PUBLIC_FUTURE_ELECTRONICS_KEY = 'XTUU8-M6GWC-4ZIQ9-AH9IW-OKXH5',
    NEXT_PUBLIC_FUTURE_ELECTRONICS_URL = 'https://api.futureelectronics.com/api/v1/pim-future'
} = process.env

module.exports = {
    NEXT_PUBLIC_GOOGLE_SHEETS_PRIVATE_KEY,
    NEXT_PUBLIC_SPREADSHEET_ID,
    NEXT_PUBLIC_GOOGLE_SHEETS_CLIENT_EMAIL,
    NEXT_PUBLIC_FUTURE_ELECTRONICS_KEY,
    NEXT_PUBLIC_FUTURE_ELECTRONICS_URL,
}