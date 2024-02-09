import { ComplementoStatus } from "@prisma/client";
import { NcvExtrasTypes } from "@prisma/client";

import { z } from "zod";

export type createDto = z.output<typeof Create>;

export const Create = z.object({
  // Data
  data: z.object({
    placa: z.string(),
    ano: z.string(),
    kmFotos: z.array(z.string()),
    combustivelFotos: z.array(z.string()),
    chassi: z.string(),
    motor: z.string(),
    cor: z.string(),
    marca: z.string(),
    modelo: z.string(),
    municipio: z.string(),
    uf: z.string(),
    km: z.string(),
    chamadoId: z.string(),
    shouldFinishChamado: z.boolean().optional(),
  }),

  // Avarias
  avarias: z.object({
    documentos_foto: z.array(z.string()).optional(),
    lateral_direita_foto: z.array(z.string()).optional(),
    lateral_esquerda_foto: z.array(z.string()).optional(),
    traseira: z.array(z.string()).optional(),
    dianteira: z.array(z.string()).optional(),
    teto: z.array(z.string()).optional(),
    outros: z.array(z.string()).optional(),
    avarias_detailes: z.string().optional(),
  }),

  // Apreensao
  apreensoes: z.object({
    chaves: z.boolean().optional(),
    blitz: z.boolean().optional(),
    guinchoColetivo: z.boolean().optional(),
    kmPercorrido: z.string().optional(),
    adulterado: z.boolean().optional(),
    crimesTransito: z.boolean().optional(),
    emTela: z.boolean().optional(),
    foraCirculacao: z.boolean().optional(),
    judicial: z.boolean().optional(),
    leasing: z.boolean().optional(),
    motoQueixa: z.boolean().optional(),
    pedirBaixa: z.boolean().optional(),
    policiaCivil: z.boolean().optional(),
    traficoDrogas: z.boolean().optional(),
    rouboFurto: z.boolean().optional(),
    semDocumentosCrv: z.boolean().optional(),
    infracaoTransito: z.boolean().optional(),
    motivoApreensao: z.string().optional(),
  }),

  // Acessorios
  acessorios: z.object({
    arCondicionado: z.boolean().optional(),
    vidroEletrico: z.boolean().optional(),
    cambioManual: z.boolean().optional(),
    cambioAutomatico: z.boolean().optional(),
    radioCd: z.boolean().optional(),
    pneuStep: z.boolean().optional(),
    rodaComum: z.boolean().optional(),
    rodaEspecial: z.boolean().optional(),
    calotas: z.boolean().optional(),
    antena: z.boolean().optional(),
    documento: z.boolean().optional(),
    carroFuncionando: z.boolean().optional(),
  }),

  // Complemento
  complemento: z.object({
    pintura: z.nativeEnum(ComplementoStatus),
    tapecaria: z.nativeEnum(ComplementoStatus),
    pneus: z.nativeEnum(ComplementoStatus),
  }),
});


export type createDtoExtras = z.output<typeof CreateExtra>;

export const CreateExtra = z.object({
  type: z.nativeEnum(NcvExtrasTypes),
  valor: z.string(),
  observacao: z.string(),
});




export type createDtoDocument = z.output<typeof CreateDocument>;

export const CreateDocument = z.object({
  tipo: z.string(),
  detalhes: z.string(),
  file: z.string(),
});



