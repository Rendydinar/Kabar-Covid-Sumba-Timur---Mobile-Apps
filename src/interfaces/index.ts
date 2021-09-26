export interface IKelurahan {
  name: string;
  total: number;
  isShow?: boolean;
  isDesa?: boolean;
}

export interface IKecamatan {
  name: string;
  kelurahan: IKelurahan[];
  total?: number;
  isShow?: boolean;
}

export interface IIsolasi {
  nama_tempat: string;
  kasus_terkonfirmasi: number;
  place_map: string;
  terkonfirmasi?:number;
  menunggu_hasil_pcr?:number;
}

export interface IFormUbahDataCovid {
  harian_antigen: number | string;
  harian_pcr_tcm: number | string;
  total_dirawat: number | string;
  total_meninggal: number | string;
  total_positif: number | string;
  total_sembuh: number | string;
  rapid_antigen_negatif: number | string;
  rapid_antigen_positif: number | string;
  tcm_prc_negatif: number | string;
  tcm_prc_positif: number | string;
}

export interface IUbahDataIsolasi {
  date: string;
  data: {
    isolasi_mandiri: IIsolasi;
    isolasi_terpusat: {data: IIsolasi[]};
    rawat_rsud: IIsolasi;
  };
}

export interface IFormTambahDataVaksin {
  keterangan: string;
  sumber:string;
  img_uri: string;
  jenis_vaksin: string;
  date: string;
  image_name: string;
  timestamp?:number
  place_map?:string;
  kewajiban:string[];
  kouta?:number;
  waktu_berakhir_timestamp?:number
}

export interface IVaksin {
  date: string;
  img_url: string;
  timestamp: number;
  keterangan?: string;
  sumber?: string;
  jenis_vaksin?: string;  
  place_map?:string;
  kewajiban?:string[];
  kouta?:number;
  waktu_berakhir_timestamp?:number
}

export interface IJadwalVaksinMessage {
  vaksin_id: string;
  created_at: string;
  sent_at: string | null;
}