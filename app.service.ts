import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  hitungNilai(body: any) {
    throw new Error('Method not implemented.');
  }
  // SOAL NOMOR 1
  getcekBilangan(angkaAsli: string): object { 
    if (!angkaAsli || angkaAsli === '') {
      throw new BadRequestException('Angka tidak boleh kosong');
    }
    
    const angka = Number(angkaAsli);
    if (Number.isNaN(angka) || !Number.isInteger(angka) || angka < 1 || angka > 100) {
      throw new BadRequestException('Angka harus bilangan bulat antara 1 sampai 100');
    }

    let jenis = '';
    if (angka % 2 === 0) {
      jenis = 'genap';
    } else {
      jenis = 'ganjil';
    }

    let kelipatan = false;
    if (angka % 5 === 0 ) {
      kelipatan = true
    }

    const result = {
      angka: angka,
      jenis: jenis,
      kuadrat: angka * angka,
      kelipatanLima: kelipatan
    };

    return result;
  }

  // SOAL NOMOR 2
  getSuhu(nilaiAsli: string, dari: string, ke: string): object {
    if (nilaiAsli === undefined || dari === undefined || ke === undefined) {
      throw new BadRequestException('Parameter nilai, dari, dan ke harus diisi');
    }
    const nilai = Number(nilaiAsli);
    if (Number.isNaN(nilai)) {
      throw new BadRequestException('Nilai harus berupa angka');
    }

    if (dari === ke) {
      throw new BadRequestException('Satuan dari dan ke tidak boleh sama');
    }

    if (dari === 'kelvin' && nilai < 0) {
      throw new BadRequestException('Nilai suhu dalam Kelvin tidak boleh kurang dari 0');
    }

    let celcius: number;
    if (dari === 'celcius') {
      celcius = nilai;
    } else if (dari === 'fahrenheit') {
      celcius = (nilai - 32) * 5 / 9;
    } else if (dari === 'kelvin') {
      celcius = nilai - 273.15;
    } else {
      throw new BadRequestException('Satuan dari tidak valid');
    }

    let hasil: number;
    if (ke === 'celcius') {
      hasil = celcius;
    } else if (ke === 'fahrenheit') {
      hasil = (celcius * 9 / 5) + 32;
    } else if (ke === 'kelvin') {
      hasil = celcius + 273.15;
    } else {
      throw new BadRequestException('Satuan ke tidak valid');
    }

    const result = {
      nilaiAsli: nilai,
      dari: dari,
      ke: ke,
      hasil: Math.round(hasil * 100) / 100,
      satuanHasil: ke
    };
    return result;
  }

  getHello(): string {
    return 'Hello World!';
  }

  countLuasBalok(panjang: number, lebar: number): number {
    if (panjang <= 0 || lebar <= 0) {
      throw new Error('Panjang dan lebar harus lebih besar dari 0');
    }
    return panjang * lebar;
  }

  countBelahKetupat(d1: number, d2: number, sisi: number): {
    luas: number, keliling: number} {
    if (d1 <= 0 || d2 <= 0) {
      throw new Error('Diagonal harus lebih besar dari 0');
    }
    const luas = (d1 * d2) / 2;
    const keliling = 4 * sisi;
    const result = {
      luas: luas,
      keliling: keliling
    };

    return result;
  }

  // SOAL NOMOR 3
  Deret(jenis: string, jumlahAsli: string, urutan: string | undefined): object {
    if (jumlahAsli === undefined || jumlahAsli === '') {
      throw new BadRequestException('Parameter jumlah harus diisi');
    }

    const jumlah = Number(jumlahAsli);
    if (Number.isNaN(jumlah) || !Number.isInteger(jumlah) || jumlah < 1 || jumlah > 20) {
      throw new BadRequestException('Jumlah harus bilangan bulat 1 sampai 20');
    }

    let data = [];
    let total = 0;

    for (let i = 1; i <= jumlah; i++) {
      let nilai = 0;
      if (jenis === 'ganjil') {
        nilai = 2 * i - 1;
      } else if (jenis === 'genap') {
        nilai = 2 * i;
      } else if (jenis === 'kuadrat') {
        nilai = i * i;
      } else {
        throw new BadRequestException('Jenis hanya boleh ganjil, genap, atau kuadrat');
      }

      data.push(nilai);
      total = total + nilai;
    }

    const result = {
      jenis: jenis,
      jumlah: jumlah,
      data: data,
      total: total
    };

    return result;
  }

  // SOAL NOMOR 4
  hitungNilaiRapor(nama: string, tugas: number[], uts: number, uas: number): object {
    if (typeof nama !== 'string' || nama === '') {
      throw new BadRequestException('Nama harus string dan tidak boleh kosong');
    }
    
    if (!Array.isArray(tugas) || tugas.length === 0) {
      throw new BadRequestException('Tugas harus array berisi minimal 1 angka');
    }

    let totalTugas = 0;
    for (let i = 0; i < tugas.length; i++) {
      const nilaiTugas = tugas[i];
      if (typeof nilaiTugas !== 'number' || nilaiTugas < 0 || nilaiTugas > 100) {
        throw new BadRequestException('Setiap nilai tugas harus angka antara 0 sampai 100');
      }
      totalTugas = totalTugas + nilaiTugas;
    }

    if (typeof uts !== 'number' || uts < 0 || uts > 100) {
      throw new BadRequestException('UTS harus angka antara 0 sampai 100');
    }
    
    if (typeof uas !== 'number' || uas < 0 || uas > 100) {
      throw new BadRequestException('UAS harus angka antara 0 sampai 100');
    }

    const rataTugas = totalTugas / tugas.length;
    let nilaiAkhir = (0.3 * rataTugas) + (0.3 * uts) + (0.4 * uas);
    nilaiAkhir = Math.round(nilaiAkhir * 100) / 100;

    let predikat = 'D';
    if (nilaiAkhir >= 90) {
      predikat = 'A';
    } else if (nilaiAkhir >= 80) {
      predikat = 'B';
    } else if (nilaiAkhir >= 70) {
      predikat = 'C';
    }

    let status = 'Remedial';
    if (nilaiAkhir >= 75) {
      status = 'Lulus';
    }

    const result = {
      nama: nama,
      rataTugas: rataTugas,
      nilaiAkhir: nilaiAkhir,
      predikat: predikat,
      status: status
    };

    return result;
  }


// SOAL 5: Kasir Toko
  checkoutKasir(memberParam: string, metodeQuery: string, body: any) {
    // Validasi member[cite: 6]
    if (!memberParam) throw new BadRequestException('Member wajib diisi di parameter');
    const member = memberParam.toLowerCase();
    if (!['reguler', 'silver', 'gold'].includes(member)) {
      throw new BadRequestException('Member hanya boleh reguler, silver, atau gold');
    }

    // Validasi metode[cite: 6]
    if (!metodeQuery) throw new BadRequestException('Query metode wajib diisi');
    const metode = metodeQuery.toLowerCase();
    if (!['tunai', 'qris'].includes(metode)) {
      throw new BadRequestException('Metode hanya boleh tunai atau qris');
    }

    const { items } = body;
    // Validasi array items[cite: 6]
    if (!Array.isArray(items) || items.length === 0 || items.length > 10) {
      throw new BadRequestException('Items harus array, tidak kosong, dan maksimal 10 item');
    }

    let subtotalKeseluruhan = 0;
    let totalItem = 0;
    const rincian = [];

    // Validasi per item dan hitung subtotal[cite: 6, 7]
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (typeof item !== 'object' || item === null) {
        throw new BadRequestException(`Item ke-${i + 1}: format item tidak valid`);
      }

      if (typeof item.nama !== 'string' || item.nama.trim() === '') {
        throw new BadRequestException(`Item ke-${i + 1}: nama harus berupa string tidak kosong`);
      }
      if (typeof item.harga !== 'number' || item.harga <= 0) {
        throw new BadRequestException(`Item ke-${i + 1}: harga harus angka lebih dari 0`);
      }
      if (typeof item.qty !== 'number' || !Number.isInteger(item.qty) || item.qty <= 0) {
        throw new BadRequestException(`Item ke-${i + 1}: qty harus bilangan bulat lebih dari 0`);
      }

      const subtotalItem = item.harga * item.qty;
      subtotalKeseluruhan += subtotalItem;
      totalItem += item.qty;

      rincian.push({
        nama: item.nama,
        harga: item.harga,
        qty: item.qty,
        subtotal: subtotalItem
      });
    }

    // Hitung diskon, admin, total[cite: 6, 7]
    const diskonMember = { reguler: 0, silver: 5, gold: 10 };
    const persenDiskon = diskonMember[member as keyof typeof diskonMember];
    
    const diskon = subtotalKeseluruhan * (persenDiskon / 100);
    const setelahDiskon = subtotalKeseluruhan - diskon;
    
    const biayaAdmin = metode === 'qris' ? setelahDiskon * (1 / 100) : 0;
    const total = setelahDiskon + biayaAdmin;

    return {
      member,
      metode,
      rincian,
      totalItem,
      subtotal: subtotalKeseluruhan,
      diskon,
      biayaAdmin,
      total
    };
  }


  }



