import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { chatFields, chatOperations } from './ChatDescription';
import { imageFields, imageOperations } from './ImageDescription';

export class InfomaniakAINode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'InfomaniakAI',
		name: 'infomaniakAi',
		icon: 'file:infomaniak.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interaction avec l’API Infomaniak AI',
		defaults: { name: 'InfomaniakAI' },
		inputs: ['main'],
		outputs: ['main'],
		credentials: [{ name: 'infomaniakAiApi', required: true }],
		requestDefaults: {
			ignoreHttpStatusErrors: true,
			baseURL: '={{ $credentials.url || "https://api.infomaniak.com/1/ai" }}',
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Chat',
						value: 'chat',
					},
					{
						name: 'Image',
						value: 'image',
					},
					{
						name: 'Audio',
						value: 'audio',
					},
				],
				default: 'chat',
			},

			...chatOperations,
			...chatFields,
			...imageOperations,
			...imageFields,
		],
	};
}
