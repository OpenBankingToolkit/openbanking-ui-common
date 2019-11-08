export const DataStore1Response = {
  authId:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoSW5kZXhWYWx1ZSI6InB1c2giLCJvdGsiOiI1aGFzNGNkZTB1cWFwNGNxYjQyaTVobXVxMyIsImF1dGhJbmRleFR5cGUiOiJzZXJ2aWNlIiwicmVhbG0iOiJvPXRlc3Qsb3U9c2VydmljZXMsbz1vcGVuYW0iLCJzZXNzaW9uSWQiOiI0OUJEZmItakh1N0MxM2VGMDkzM2VxaFpDeGMuKkFBSlRTUUFDTURVQUFsTkxBQnhJTWpCMFNYVldjV3R4UTJFMlYyNVVhVWRXZEZGcmVqZ3dTVms5QUFKVE1RQUEqIn0._gQWe622NpGp4-ivnDF7Y_mHCaHJE_ZC1yQEIAvkJsw',
  template: '',
  stage: 'DataStore1',
  header: 'Sign in',
  callbacks: [
    {
      type: 'NameCallback',
      output: [{ name: 'prompt', value: 'User Name:' }],
      input: [{ name: 'IDToken1', value: '' }]
    },
    {
      type: 'PasswordCallback',
      output: [{ name: 'prompt', value: 'Password:' }],
      input: [{ name: 'IDToken2', value: '' }]
    }
  ]
};

export const AuthenticatorPushRegistration2Response = {
  authId:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoSW5kZXhWYWx1ZSI6InB1c2giLCJvdGsiOiI5MzA4MTV0aDJoYjBlZTFsdWRpN2g1M3VxcSIsImF1dGhJbmRleFR5cGUiOiJzZXJ2aWNlIiwicmVhbG0iOiJvPXRlc3Qsb3U9c2VydmljZXMsbz1vcGVuYW0iLCJzZXNzaW9uSWQiOiJhNUhDeXVzRTg4akRnOVZvMm5HbklZZHVZMVEuKkFBSlRTUUFDTURVQUFsTkxBQng0WmtoaFIwbExPRWxvYVd0TE5XWndlRWxXYW1GRVUzYzVjVzg5QUFKVE1RQUEqIn0.7e6ypO_QvW1GHiK9Vd-_V63QLsdtRHQ3RsHMivtz5vo',
  template: '',
  stage: 'AuthenticatorPushRegistration2',
  header: 'ForgeRock Authenticator (Push) Registration',
  callbacks: [
    {
      type: 'ConfirmationCallback',
      output: [
        { name: 'prompt', value: '' },
        { name: 'messageType', value: 0 },
        { name: 'options', value: ['Register Device', 'Get the App'] },
        { name: 'optionType', value: -1 },
        { name: 'defaultOption', value: 0 }
      ],
      input: [{ name: 'IDToken1', value: 0 }]
    }
  ]
};

export const AuthenticatorPushRegistration3Response = {
  authId:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoSW5kZXhWYWx1ZSI6InB1c2giLCJvdGsiOiJoc2U2NGdqZTBlYXYyM20xZmo5ZGphaTg0bCIsImF1dGhJbmRleFR5cGUiOiJzZXJ2aWNlIiwicmVhbG0iOiJvPXRlc3Qsb3U9c2VydmljZXMsbz1vcGVuYW0iLCJzZXNzaW9uSWQiOiJlYzRZNlJtQWN0V21IWTd0akpHM2txanZyXzguKkFBSlRTUUFDTURVQUFsTkxBQnhMYTNRMFVrOU5iRFp4Um05elZHSkhOMkZ6WVRaM2JqWXJPVlU5QUFKVE1RQUEqIn0.QXhRxgAyGhwdVlK3Tht47UOZQVxydqqSl0fa7EH1Ksc',
  template: '',
  stage: 'AuthenticatorPushRegistration3',
  header: 'ForgeRock Authenticator (Push) Registration',
  callbacks: [
    {
      type: 'TextOutputCallback',
      output: [
        {
          name: 'message',
          value: 'https://itunes.apple.com/app/forgerock-authenticator/id1038442926'
        },
        { name: 'messageType', value: '0' }
      ]
    },
    {
      type: 'TextOutputCallback',
      output: [
        {
          name: 'message',
          value: 'https://play.google.com/store/apps/details?id=com.forgerock.authenticator'
        },
        { name: 'messageType', value: '0' }
      ]
    },
    {
      type: 'ConfirmationCallback',
      output: [
        { name: 'prompt', value: '' },
        { name: 'messageType', value: 0 },
        { name: 'options', value: ['Continue'] },
        { name: 'optionType', value: -1 },
        { name: 'defaultOption', value: 0 }
      ],
      input: [{ name: 'IDToken3', value: 0 }]
    }
  ]
};

export const AuthenticatorPushRegistration4Response = {
  authId:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoSW5kZXhWYWx1ZSI6InB1c2giLCJvdGsiOiJyMDZtdThydDliY3ZydXZ2b2VoNG9idThrbiIsImF1dGhJbmRleFR5cGUiOiJzZXJ2aWNlIiwicmVhbG0iOiJvPXRlc3Qsb3U9c2VydmljZXMsbz1vcGVuYW0iLCJzZXNzaW9uSWQiOiItLXBEV0NkQzREMnNQSU9CYkNCQjZYdC13b00uKkFBSlRTUUFDTURVQUFsTkxBQnhIZERKRlVVOVZlamwxWkhjNE4xQnplbmhZZUdaR1oxSTFaSGM5QUFKVE1RQUEqIn0.236nX17qHnNxIaifmCA0GCB3gC56A0wtB3cgnDhFdLU',
  template: '',
  stage: 'AuthenticatorPushRegistration4',
  header: 'Register a device',
  callbacks: [
    {
      type: 'TextOutputCallback',
      output: [
        {
          name: 'message',
          value:
            '\n            Scan the barcode image below with the ForgeRock Authenticator app to register your device with your login.\n        '
        },
        { name: 'messageType', value: '0' }
      ]
    },
    {
      type: 'TextOutputCallback',
      output: [
        {
          name: 'message',
          value:
            "require(['org/forgerock/openam/server/util/QRCodeReader'], function (QRCodeReader) {\n    QRCodeReader.createCode({\n        id: 'callback_1',\n        text: 'pushauth://push/forgerock:demo?a=aHR0cHM6Ly9hbS5pbnRlZy1vYi5mb3JnZXJvY2suZmluYW5jaWFsOjgwL2pzb24vdGVzdC9wdXNoL3Nucy9tZXNzYWdlP19hY3Rpb249YXV0aGVudGljYXRl&b=519387&r=aHR0cHM6Ly9hbS5pbnRlZy1vYi5mb3JnZXJvY2suZmluYW5jaWFsOjgwL2pzb24vdGVzdC9wdXNoL3Nucy9tZXNzYWdlP19hY3Rpb249cmVnaXN0ZXI&s=-EzIMv3Cc1Oqqc5p20bGwYlQSYOuYGJPtUqTKNA9eBM&c=AKgIElYuDzQJScHNTJK6gMe7nel-teswKK7JRqcjKFc&l=YW1sYmNvb2tpZT0wNQ&m=70a70297-17e4-4071-910b-6edf0b982bac1538128321635&issuer=Rm9yZ2VSb2Nr',\n        version: '20',\n        code: 'L'\n    });\n});"
        },
        { name: 'messageType', value: '4' }
      ]
    },
    {
      type: 'PollingWaitCallback',
      output: [{ name: 'waitTime', value: '99999999999' }]
    }
  ]
};

export const AuthenticatorPush3Response = {
  authId:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoSW5kZXhWYWx1ZSI6InB1c2giLCJvdGsiOiJsaGE0NjdhMXZmOTBrc2ZiZzVldW42dGFtdSIsImF1dGhJbmRleFR5cGUiOiJzZXJ2aWNlIiwicmVhbG0iOiJvPXRlc3Qsb3U9c2VydmljZXMsbz1vcGVuYW0iLCJzZXNzaW9uSWQiOiJvRFVhSnA0OGZWaWdIc2VPUWdFdXJyMi1wa3cuKkFBSlRTUUFDTURVQUFsTkxBQnhKTmpWalMwcEVVRzVpYzFSRGNIWnVNRXhTYjFneFQzZFpSazA5QUFKVE1RQUEqIn0.HzoN7V7HJRDqYtSBUak7GAmUP3ABWR_eyxUakIXm-Wk',
  template: '',
  stage: 'AuthenticatorPush3',
  header: 'Authenticator Push',
  callbacks: [
    {
      type: 'PollingWaitCallback',
      output: [{ name: 'waitTime', value: '99999999999' }]
    },
    {
      type: 'ConfirmationCallback',
      output: [
        { name: 'prompt', value: '' },
        { name: 'messageType', value: 0 },
        { name: 'options', value: ['Use Emergency Code'] },
        { name: 'optionType', value: -1 },
        { name: 'defaultOption', value: 0 }
      ],
      input: [{ name: 'IDToken2', value: 100 }]
    }
  ]
};

export const AuthenticatorPush4Response = {
  authId:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoSW5kZXhWYWx1ZSI6InB1c2giLCJvdGsiOiJzZWVzdWtnZzFtZGxxdGE4MDlqazBsaHE3dCIsImF1dGhJbmRleFR5cGUiOiJzZXJ2aWNlIiwicmVhbG0iOiJvPXRlc3Qsb3U9c2VydmljZXMsbz1vcGVuYW0iLCJzZXNzaW9uSWQiOiIwZlBzUTZONXBqai1nT25FV0FPenRnODhJS2MuKkFBSlRTUUFDTURFQUFsTkxBQnd5WVRWRk9FbHhlamxVYkhGQ0wwRjBVakIzUVZCelpVOHJjMWs5QUFKVE1RQUEqIn0.IifFmZJzbrn7E-8WA9-F7pSy2W3NqtISh58DqaRLeWU',
  template: '',
  stage: 'AuthenticatorPush4',
  header: 'Use ForgeRock Authenticator (Push) Recovery Code',
  callbacks: [
    {
      type: 'NameCallback',
      output: [{ name: 'prompt', value: 'Recovery Code' }],
      input: [{ name: 'IDToken1', value: '' }]
    },
    {
      type: 'ConfirmationCallback',
      output: [
        { name: 'prompt', value: '' },
        { name: 'messageType', value: 0 },
        { name: 'options', value: ['OK'] },
        { name: 'optionType', value: -1 },
        { name: 'defaultOption', value: 0 }
      ],
      input: [{ name: 'IDToken2', value: 0 }]
    }
  ]
};
