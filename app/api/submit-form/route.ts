import { query } from '@/lib/db';
import { FormDataSchema } from '@/lib/validation';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = FormDataSchema.parse(body);
    const { name, email, whatsapp, acceptedTerm, perfil } = validatedData;

    const existingUser = await query(
      'SELECT id FROM accounts_lp WHERE email = $1 OR whatsapp = $2',
      [email || null, whatsapp]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Já existe um cadastro com este email ou WhatsApp.' 
        },
        { status: 409 }
      );
    }

    const result = await query(
      `INSERT INTO accounts_lp (name, email, whatsapp, accepted_term, perfil) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id`,
      [name, email || null, whatsapp, acceptedTerm, perfil]
    );
    
    if (result.rows.length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Cadastro realizado com sucesso! Entraremos em contato em breve.',
        id: result.rows[0].id
      });
    } else {
      throw new Error('Falha ao inserir dados no banco');
    }
    
  } catch (error) {
    console.error('Erro na API /api/submit-form - erro interno');
    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      return NextResponse.json(
        { 
          success: false, 
          message: firstError?.message || 'Dados inválidos'
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Erro interno do servidor. Tente novamente.' 
      },
      { status: 500 }
    );
  }
}