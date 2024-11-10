import * as p from '@clack/prompts'
import { NAME_CLI } from '@const/cli'
import { select_answer } from '@cli/input'

function header_cli(msg: string) {
	p.intro(msg)
}

function message_cli(msg: string) {
	p.outro(msg)
}

export async function cli_app() {
	header_cli(`Welcome to ${NAME_CLI}`)
	const answer = await select_answer({
		message: 'What do you want to do?',
		options: [
			{
				value: 'setup',
				label: 'Setup',
			},
			{
				value: 'start',
				label: 'Start',
			},
			{
				value: 'exit',
				label: 'Exit',
			},
		],
	})

	switch (answer) {
		case 'setup':
			message_cli('Setup')
			break
		case 'start':
			message_cli('Start')
			break
		case 'exit':
			p.cancel('Operation canceled')
			process.exit(0)
		default:
			p.cancel('Operation canceled')
			process.exit(0)
	}
}
