import { Request, Response } from 'express';
import Pool from '../database/connection';
import PdfMakePrinter from 'pdfmake';

export const getClientes = async (req: Request, res: Response): Promise<any> => {
    const sql = `select ide_perso as value, cedula_perso||' - '|| nombre_perso as label from ban_persona where tipo_perso=0`;
    try {
        const data = await Pool.consultar(sql, []);
        res.json({ error: false, datos: data });
    } catch (error) {
        console.log(error.detail);
        res.status(400).json(error)
    }
}

export const getCuentasCliente = async (req: Request, res: Response): Promise<any> => {
    const { persona } = req.body;
    const sql = `select ide_cuban as value, numero_cuban ||' - '|| detalle_batcb as label
    from ban_cuenta_bancaria a, ban_tipo_cuenta_bancaria b
    where a.ide_batcb=b.ide_batcb and activo_cuban=true and ide_perso=$1`;
    // console.log('recibo como parametro <<<>>>',persona);
    try {
        const data = await Pool.consultar(sql, [persona]);
        res.json({ error: false, datos: data });
    } catch (error) {
        console.log(error.detail);
        res.status(400).json(error)
    }
}

export const getClientesExcluido = async (req: Request, res: Response): Promise<any> => {
    const { persona } = req.body;
    const sql = `select ide_perso as value, cedula_perso||' - '|| nombre_perso as label from ban_persona  where not ide_perso=$1`;
    try {
        const data = await Pool.consultar(sql, [persona]);
        res.json({ error: false, datos: data });
    } catch (error) {
        console.log(error.detail);
        res.status(400).json(error)
    }
}

export const getCuentasClienteAll = async (req: Request, res: Response): Promise<any> => {
    const sql = `select ide_cuban as value, numero_cuban ||' - '|| detalle_batcb as label
    from ban_cuenta_bancaria a, ban_tipo_cuenta_bancaria b
    where a.ide_batcb=b.ide_batcb`;
    try {
        const data = await Pool.consultar(sql);
        res.json({ error: false, datos: data });
    } catch (error) {
        console.log(error.detail);
        res.status(400).json(error)
    }
}


export const getTransacciones = async (req: Request, res: Response): Promise<any> => {
    const { condicion, valores } = req.body;
    const condiciones = [];
    if (condicion) {
        condiciones.push({
            condicion,
            valores
        })
    }
    let sql = `select ide_batran,e.nombre_perso as empleado,b.nombre_perso as cliente, c.nombre_perso as tranferido,detalle_bacaj as caja,
    case when tipo_transaccion_batran = 0 then 'DEPOSITO' else case when tipo_transaccion_batran = 1 then 'RETIRO'
    else case when tipo_transaccion_batran = 2 then 'TRANSFERENCIA' end end end as tipo_transferencia,valor_batran as valor,
    cast(fecha_batran as varchar) as fecha,hora_batran as hora
    from ban_transaccion a
    left join ban_persona b on a.ide_perso=b.ide_perso
    left join ban_persona c on a.ban_ide_perso=c.ide_perso
    left join ban_caja d on a.ide_bacaj=d.ide_bacaj
    left join ban_persona e on a.ban_ide_perso2=e.ide_perso`;
    let valorData = [];
    if (condiciones.length > 0) {
        sql += ` WHERE 1 = 1 AND ${condiciones[0].condicion} order by ide_batran desc`;
        valorData = condiciones[0].valores;
    } else {
        sql += 'order by ide_batran desc';
    }
    try {

        // console.log('sql > '+sql);

        const data = await Pool.consultar(sql, valorData);
        res.json({ error: false, datos: data });
    } catch (error) {
        console.log(error.detail);
        res.status(400).json(error)
    }

}

export const getTicket = async (req: Request, res: Response) => {
    const sql = `select ide_batran, case when tipo_transaccion_batran = 0 then 'DEPOSITO' else case when tipo_transaccion_batran = 1 then 'RETIRO' 
    else case when tipo_transaccion_batran = 2 then 'TRANSFERENCIA' end end end as tipo,REPLACE(cast(valor_batran as varchar), '-','') as valor,
    cast(fecha_batran as varchar) as fecha,hora_batran as hora,nombre_perso as cajero,detalle_bacaj as caja
    from ban_transaccion a,ban_persona b, ban_caja c
    where a.ban_ide_perso2=b.ide_perso and a.ide_bacaj=c.ide_bacaj
    order by ide_batran desc limit 1`;
    try {
        const data = await Pool.consultar(sql);

        // formo el pdf

        const documentDefinition = {
            pageSize: {
                width: 255.28,
                height: 'auto'
            },
            info: {
                title: 'TICKET',
                author: 'SIGAP',
                subject: 'TICKET DE TRANSACCION',
                keywords: 'TICKET DE TRANSACCION',
            },
            content: [
                { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 180, y2: 0, lineWidth: 1 }] },
                {
                    text: data[0].tipo + ' \n',
                    alignment: 'center',
                    fontSize: 14, bold: true
                },
                { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 180, y2: 0, lineWidth: 1 }] },
                { text: '\n', alignment: 'center', fontSize: 12, bold: true },
                {
                    text: [
                        { text: 'FECHA: ', fontSize: 12, bold: true },
                        '                  ' + data[0].fecha,
                        '\n\n'
                    ]
                },
                {
                    text: [
                        { text: 'HORA: ', fontSize: 12, bold: true },
                        '                    ' + data[0].hora,
                        '\n\n'
                    ]
                },
                {
                    text: [
                        { text: 'VALOR: ', fontSize: 12, bold: true },
                        '                   $ ' + data[0].valor,
                        '\n\n'
                    ]
                }, {
                    text: [
                        { text: 'CAJA: ', fontSize: 12, bold: true },
                        '                     ' + data[0].caja,
                        '\n\n'
                    ]
                },
                {
                    text: [
                        { text: 'CAJERO: ', fontSize: 12, bold: true },
                        '   ' + data[0].cajero,
                        '\n\n'
                    ]
                },
                { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 180, y2: 0, lineWidth: 1 }] },
                { text: '\n', alignment: 'center', fontSize: 12, bold: true },
                { text: 'TRANSACCION OK', alignment: 'center', fontSize: 10, bold: true },

            ]

        };
        generatePdf(documentDefinition, response => res.json(response));
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }

}

const fonts = {
    Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
};
const generatePdf = (docDefinition: any, callback: (arg0: string) => void) => {
    try {
        const printer = new PdfMakePrinter(fonts);
        const doc = printer.createPdfKitDocument(docDefinition);
        const chunks: any[] = [];

        doc.on('data', (chunk: any) => {
            chunks.push(chunk);
        });

        doc.on('end', () => {
            const result = Buffer.concat(chunks);
            // console.log(result);
            callback(`data:application/pdf;base64,${result.toString('base64')}`);
        });

        doc.end();
    } catch (err) {
        throw (err);
    }
};