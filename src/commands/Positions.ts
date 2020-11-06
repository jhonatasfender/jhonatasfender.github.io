import { green } from "ansi-colors";
import { Terminal } from "xterm";
import { CommandImplements } from "./CommandImplements";

export type TypePosition = 'companyName' | 'description' | 'finishedOn' | 'location' | 'startedOn' | 'title'

export type PositionsHistory = { [key in TypePosition]?: string }

export class Positions extends CommandImplements {

    private static term: Terminal
    private static command: string[]

    private constructor() { super() }

    public static execute(term: Terminal, command: string[]): Promise<void> {
        this.term = term
        this.command = command

        const t = fetch('/linkedin/Positions.csv')
            .then((response) => {
                if (response.ok) {
                    return response.text();
                }
                console.log('Unexpected response', response);
                throw new Error('Network response was not ok.');
            })
            .then((csv: string) => Positions.csvToJSON(csv))
            .then((csv: PositionsHistory[]) => {
                Positions.print(csv, term)
            })
            .catch((e: any) => {
                console.log('err', e)
            });

        return t
    }

    public static print(csv: PositionsHistory[], term: Terminal) {
        term.writeln('')
        for (const position of csv) {
            term.writeln(green.bold("##################################################################"))
            term.writeln(position.title as string)
            term.writeln(position.companyName as string)
            term.writeln(position.description as string)
            term.writeln(position.location as string)
            term.writeln(position.startedOn as string)
            position.finishedOn && term.writeln(position.finishedOn as string)
            term.writeln(green.bold("##################################################################"))
        }
    }

    public static csvToJSON(csv: string): PositionsHistory[] {
        const lines = csv.split("\n");
        const result: PositionsHistory[] = [];
        const headers = lines[0].split(",");

        for (let i = 1; i < lines.length; i++) {
            const obj: PositionsHistory | any = {};
            const line = lines[i].split(/(?:^|,)(\"(?:[^\"]+|\"\")*\"|[^,]*)/g)
                .filter(v => v && v !== "")
                .map(v => v.replace(/["]/g, '').trim())

            for (let j = 0; j < headers.length; j++) {
                if (line.length) {
                    obj[this.toCamelCase(headers[j])] = line[j];
                }
            }

            if (line.length)
                result.push(obj);
        }

        console.log(result)

        return result;
    }

    private static toCamelCase(str: string): TypePosition {
        return str.toLowerCase()
            .replace(/['"]/g, '')
            .replace(/\W+/g, ' ')
            .replace(/ (.)/g, ($1) => $1.toUpperCase())
            .replace(/ /g, '') as TypePosition;
    }
}