import dotenv from 'dotenv'

dotenv.config()

const {
    /*     
    GOOGLE_SHEETS_PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCjnbpwfR3iM1E4\nTbO17mNUizhvOQi/Qe3oeEylgGAVxbBGozMthJUBmJIeJAncJrPj5i3OHrgBrZXk\n0Pl72vSyHC15bWzqbEWCbYe/lLs37wcNiv/lcfDyMQfs+Aeku1wOtiqBYF49uLwa\nSZjNFO8zenJbfZYvoZWv4FIjQzJWc5TW8bScJ15G+gDERAhDZxT98n23yFQpdIu7\nJoLOT+cr8/YE6aMrIgIPY/J0HKsxoskHYdqXMZeIMannAVu5EAU9tYQcnHVFl6e2\n1HXodTLV/ivh6a7Nub/uanNxTpTpmbCg633NCo/kmF9pAqYLMWH/noiI9cbiUIc0\nWBZ7YNjZAgMBAAECggEADTQflU/Xf0deZNGKcOJbxDkW9QzQeqS+pv28S7fUKTWi\nn9SwPtpd7vrJweJtJEXASyIqbKGYflQsjkJZ+8eD6zKwbcXpnfJeWqPtqkV9pUom\nEs72jyTWiajwx4wNi9rt1ycWv4mQGWGE1oc9bEFl+0zEmUMFgXMEAiUzY7Kax5Sb\nqva6RNWN9CxTIBG8T1Mw87lXYmmyxp5pT5pGGXjG/j5/O77ZD47MkvAHUKocKZsu\n4uTrkU7Q/GKNyZ7g755OYZX1mURw3s4oMMa+QaDqL2hn+ZKEs2L2cuRNBtrpBjlT\nIR8irk4N0ATvnF1v/OJZqCKyjlxOY3NYb7tj7tZzYQKBgQDWhZb/lZcNAwnrpuY2\npiDMaCmGaqbpH+7U7eLvDXg8eJtNa5oGh5MRzpVk/Ze8mKIIHpXY/RjfCOkGcvyv\n5zIOBhr6NbXCyKYkMLt5upgszSP8P19fUkX+u9vT39JujZdSE2TNtIy46AyKW9RQ\nlLnE4bkY95/3bGLLipj+j8hOEQKBgQDDQGfZjljnhsubdG3PbuchfYg+aFFdqYPI\nAkybYJJUMDf5dYxSFpYuQpfFQIcLxnNEZZTQkbEe3P5BpKgnsxHqffSWKVvanZ1+\n4VTZEVtbSKIRC1MUZZoGyUPUeqczEjxdfZN56/KruKimoQS8t+4kgVaoNd6EaLDV\nWZ74Dxs2SQKBgGmbNF24P7dJIq4e6MBIgmb+dErW4Dpt3P536brzb5idax7u9NF4\nFp+yintAGF3g6guDOxOqbX8G/OiO3PSfpVWgDdHVdRhh/OBeGTzw7g9IIgoBDKt5\nbjncM3kXe5mvHKpsH7jgxFIW8m1+jYPp45YX5S50YQzGD9DR90WCdQJxAoGAH8zz\nnRl0HXF05ALYh7p2Zpv9frya0/hyADdvprbZ3mBkHXspuYz4NNyfv369AAv4ZiFt\nVXMFOBOiTaq1wJGHz3toRLTDwx18s1eb7CbJjFqOGtyPUXki1wwcwhSf+s9ziX6U\ncH0fbxyKS2laTipe3Q87v/XWIhazBmysWZaMRhECgYB4CPRYCnz/F/TjRk9lyQUv\nLWgn89QNxi0NPb8JSAAjCyVC6+YcAlRl3QfAHBPY+C8BR+II6JF5fwZv4qe9E8l3\nqGefMhBPgCE4JyzHRCbSipHN4Lut5PAMa5BAT9atbS6LOzk/wWpAs9d2LXE89mt4\nrEq41sBfgDTG7lo7bKH2ww==\n-----END PRIVATE KEY-----\n',
    GOOGLE_SHEETS_CLIENT_EMAIL = 'high-demand-parts@high-demand-parts.iam.gserviceaccount.com',
    SPREADSHEET_ID = '1__EZiVAd2vb_IYpAP6i65eMosHL2y9P8V3BpDfj6qNw',
    */
    NODE_ENV = 'development',
    NEXT_PUBLIC_SERVER_URL: SERVER_URL = 'http://localhost:3000',
    NEXT_PUBLIC_GOOGLE_SHEETS_PRIVATE_KEY: GOOGLE_SHEETS_PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC4/4nFh0wYraH1\nSgWWi5Ji90JkiY53zFKLIz57BHsF36IVR47AEJ6GaSp9KMEtBu3qI+p3AatoQWrA\njaj2yiN2iiP/wAiwxedyozHc7eoxRvIJLUJGeI9m7hbaOSQFhPV42xutFdBgOFR8\n9pFSwWMwORz8znZFbUqZMnvP22zqG7XsRLccU50nlgh/dte4sgkHoJudYtXAg1Kn\niXRF2s6YPWfh7lo4h25feRmogPGu4VwWBxHflTZVU6baIBPHbG0frNsLuoX4/WY1\nbAIWa1WVYwZENfAn1FeHsQgyRvh1aJPqyamkgpfLt75oZU8vGZ86hVZMqVk89K8b\n65pEl1mdAgMBAAECggEAEzAiDJRfbrHXuhbe5IH+gXhO8RmZZtCRATB7IwxQbEgJ\nSja9ViuDHcLbrtaizrZIx//IqmZIboxWc7ldvJczvXBPko/K9vbX7jqCCf29TDYl\nFZGVrbSEfzMTuLezhkUHpuzm/nlkPw6oqLt0UEaRsKdD2+7YMpRG6APl9qW2MsPW\n1UFoUmQ2lblpsqQNx1w/hvbUQkpr83bGr01jyLG8NYIzLUZQqEiej1HDhZ1UCrPG\nYjVIDqJ0qOk1wKtNIehskioMakrwuqmaMfHT2+3xW9ghtgde2D9dDypfbWEneiEh\ndJ1N9HeqwxYT/F2/YeNSUivr1aizsxCoiBBy2+3bIQKBgQDkMqL0iAJjSFnod7nl\nSfl8TQ1Jo26xFLIsAX8d5S8npNZGRbmSnR3wJmCGK9gsalR7QdImcW6BydrLYRT0\nX4gTfyAcdUnpgxJI2+c2tzmQrWyEaI/aQHQ/Zq04bCoLD3lir6fMHba07MdR6ofF\nANLdsN3zp1M+hjBhJWSNtrxBTQKBgQDPiYejqtZSEk2aS1lHy08o8DDxCF76Zq6N\nx7AF9+p+NhqPR5nrrrjBnplJygU44rbUSdppFsvWVOgGsXnttFKaa1468y9wKuKq\nRmerzWXOQQgEepMgyIrFdlHEJV+JOnNl0LFZzBtSwHo9vN0AzrkWLkxXAW9JNxBl\nD0CuugFRkQKBgQDB49RZeQauXNcnkjK9AzGbz8wueVKf2znX8h2TxRtfz8rQQoX+\ncMjzN2hkF/TBKEdHwxFP4KlIVb41d/NZ/6GbDzS1eWKnqdprVY0LDHs41mGRz1YK\n1yDujcs4WY8PfsJge2dTIxwOdfCVRXS+ioigHJs5Xz53rYSFxkO9tToXMQKBgGwx\nsKrchzrmG9rSaUsKbMxU287spEc6fMmhTtztsCv4HMSReWbrAZq/Cf7z+OD9IH9v\nuROMNNwaC5RhtcT8ewvR6aAl45dAZEaMycNBI0/xizJ6jHVM1zu2QU5WhYXPGRX9\nRFgiFiR//7pr2XNwUgGERXweXVv3/u4Qk5IDmmhhAoGBAOFDv4Io56nmyUem+a0O\nNzNQMsA3bN9UYg0pJ0bXPAEzp+rvVlTswGjiY/UolUkkaT7yALgWkHLDdNWw+G9R\n3dqfsAiEafrJTA02uMhMMK0v0Ge5neEtbcGKyXK+wGiwKCQFQHZsMVMQKs2IVNKN\nMwcHchVr1zhEOGZbCCNmdpMe\n-----END PRIVATE KEY-----\n',
    NEXT_PUBLIC_GOOGLE_SHEETS_CLIENT_EMAIL: GOOGLE_SHEETS_CLIENT_EMAIL = 'sheet-test@my-project-49092.iam.gserviceaccount.com',
    NEXT_PUBLIC_SPREADSHEET_ID: SPREADSHEET_ID = '1sWRsWC0QBYESypZXOpostoYhrPQyXLM43RERrUSwJbw',
    NEXT_PUBLIC_FUTURE_ELECTRONICS_KEY = 'XTUU8-M6GWC-4ZIQ9-AH9IW-OKXH5',
    NEXT_PUBLIC_FUTURE_ELECTRONICS_URL = 'https://api.futureelectronics.com/api/v1/pim-future',
    NEXT_PUBLIC_SENDGRID_API_KEY: SENDGRID_API_KEY = '',
    NEXT_PUBLIC_SENDGRID_TO_EMAIL: SENDGRID_TO_EMAIL = '',
    NEXT_PUBLIC_SENDGRID_FROM_EMAIL: SENDGRID_FROM_EMAIL = '',
    NEXT_PUBLIC_SCHEDULE_DAILY_REPORT: SCHEDULE_DAILY_REPORT = '30 04 18 * * *'
} = process?.env

export {
    NODE_ENV,
    SERVER_URL,
    GOOGLE_SHEETS_PRIVATE_KEY,
    SPREADSHEET_ID,
    GOOGLE_SHEETS_CLIENT_EMAIL,
    NEXT_PUBLIC_FUTURE_ELECTRONICS_KEY,
    NEXT_PUBLIC_FUTURE_ELECTRONICS_URL,
    SENDGRID_API_KEY,
    SENDGRID_TO_EMAIL,
    SENDGRID_FROM_EMAIL,
    SCHEDULE_DAILY_REPORT,
}