import {
    ICredentialType,
    INodeProperties,
    IAuthenticateGeneric,
    ICredentialTestRequest,
} from 'n8n-workflow';

export class InfomaniakAiApi implements ICredentialType {
		name = 'infomaniakAiApi';
		displayName = 'Infomaniak AI API';
		documentationUrl = 'https://developer.infomaniak.com/api/ai/';
		properties: INodeProperties[] = [
			{
				displayName: 'API Key',
				name: 'apiKey',
				type: 'string',
				typeOptions: { password: true },
				default: '',
			},
			{
				displayName: 'Product ID (AI)',
				name: 'productId',
				type: 'string',
				default: '',
				description: 'The product ID for the AI service, retrievable from your Infomaniak interface.',
				required: true,
			},
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: 'https://api.infomaniak.com/1/ai',
			},
		];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Bearer " + $credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.url}}',
			url: '/models',
		},
	};
}
