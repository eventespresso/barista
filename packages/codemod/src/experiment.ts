import * as J from 'jscodeshift';

// TODO: reference material
// https://github.com/mskelton/ratchet/blob/main/transform.ts
// https://github.com/facebook/jscodeshift
// https://stackoverflow.com/questions/16127985/what-is-javascript-ast-how-to-play-with-it
// https://astexplorer.net/
// https://github.com/benjamn/ast-types/tree/master/src/def
// https://github.com/benjamn/recast/blob/master/lib/options.ts

// Read more: https://github.com/facebook/jscodeshift#parser
const parser = 'tsx';

const transform2: J.Transform = ({ source }, { j, report }, options) => {
	// OK
	// const root = j(source, options);
	// const nodes = root.findJSXElements('Component');
	// nodes.forEach((node) => node.prune());
	// return root.toSource();

	// console.log(JSON.stringify(options, undefined, 2));

	const targetProp = options['prop'];
	if (!targetProp) throw new Error('Missing parameter: --prop=<value>');

	const root = j(source, options);
	const vars = root.findVariableDeclarators();

	if (!vars.length) return source;

	vars.forEach((v) => {
		const parser = new Parser(v);
		const guard = new Guard(j);

		parser.props.forEach((p) => {
			if (guard.isObjectParam(p)) {
				p.properties.forEach((p2) => {
					console.log(p2);
				});
			}
		});
	});
};

class Parser {
	constructor(private readonly _node: J.ASTPath<J.VariableDeclarator>) {}

	public get name(): string {
		return (this._node.getValueProperty('id') as J.Identifier).name;
	}

	public get props() {
		const init = this.getInit();
		return init.params.filter(({ type }) => {
			return type === 'Identifier' || type === 'ObjectPattern';
		});
	}

	private getInit(): J.ArrowFunctionExpression {
		return this._node.getValueProperty('init') as J.ArrowFunctionExpression;
	}
}

class Guard {
	constructor(private readonly j: J.JSCodeshift) {}

	public isParam(input: any): input is J.Identifier {
		return this.j(input).isOfType(J.Identifier);
	}

	public isObjectParam(input: any): input is J.ObjectPattern {
		return this.j(input).isOfType(J.ObjectPattern);
	}

	public isRestParam(input: any): input is J.RestElement {
		return this.j(input).isOfType(J.RestElement);
	}
}

const transform: J.Transform = ({ path: file, source }, { j, report }, options) => {
	const targetProp: string | undefined = options['prop'];
	const targetFiles: string[] = [];

	if (!targetProp) throw new Error('Missing parameter: --prop=<value>');

	const root = j(source, options);
	const elements = root.findJSXElements();

	elements.forEach((el) => {
		j(el)
			.find(J.JSXAttribute)
			.forEach((a) => {
				const node = a.getValueProperty('name') as J.Identifier;
				// console.log(`name: ${node.name}`);
				if (node.name === targetProp) targetFiles.push(file);
				// console.log(getPath(file));
			});
	});

	// BUG: reports both components
	// BUG: App.tsx is shown twice in the same line
	report(targetFiles.join('\n'));
};

function getPath(file: string): string {
	return file.replace(__dirname, '');
}

export { parser };
export default transform;
