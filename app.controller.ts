import { Controller, Get, Post, Body, Param, Query, HttpCode, } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('luas-balok')
  countLuasBalok(@Body('panjang') panjang: number, @Body('lebar') lebar: number): number {
    return this.appService.countLuasBalok(panjang, lebar);
  }

  @Post('belah-ketupat')
  countBelahKetupat(
    @Body('d1') d1: number,
    @Body('d2') d2: number,
    @Body('sisi') sisi: number,
  ): { luas: number; keliling: number } {
    return this.appService.countBelahKetupat(d1, d2, sisi);
  }

  // SOAL NOMOR 1
  @Get('bilangan/:angka')
  getcekBilangan(@Param('angka') angka: string) {
    return this.appService.getcekBilangan(angka);
  }

  // SOAL NOMOR 2
  @Get('suhu/:konversi')
    konversi(
    @Query('nilai') nilai: string,
    @Query('dari') dari: string,
    @Query('ke') ke: string) {
    return this.appService.getSuhu(nilai, dari, ke);
  }

  // SOAL NOMOR 3
  @Get('deret/:jenis')
  generatorDeret(
    @Param('jenis') jenis: string,
    @Query('jumlah') jumlah: string,
    @Query('urutan') urutan?: string, // Query opsional untuk nilai tambahan tantangan[cite: 1]
  ) {
    return this.appService.Deret(jenis, jumlah, urutan);
}

  // SOAL 4: Penghitung Nilai Rapor[cite: 5, 7]
  @Post('nilai/hitung')
  @HttpCode(200) // Tantangan Soal 4: Ubah status bawaan 201 Created ke 200 OK[cite: 5]
  hitungNilaiRapor(@Body() body: any) {
    return this.appService.hitungNilai(body);
  }

  // SOAL 5: Kasir Toko[cite: 6, 7]
  @Post('kasir/checkout/:member')
  @HttpCode(200) // Method POST tanpa pembuatan data ke DB disarankan pakai 200
  checkoutKasir(
    @Param('member') member: string,
    @Query('metode') metode: string,
    @Body() body: any
  ) {
    return this.appService.checkoutKasir(member, metode, body);
  }

}
