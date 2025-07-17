export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  content: SlideContent[];
}

export interface SlideContent {
  type: 'text' | 'list' | 'code' | 'grid' | 'timeline' | 'quote' | 'steps';
  data: any;
}

export const slideData: SlideData[] = [
  {
    id: 0,
    title: '"NU4YOU" RISC-V HANDS-ON WORKSHOP',
    subtitle: 'Naruemon Rattanakunakorn & Paul Sherman',
    content: [
      {
        type: 'text',
        data: {
          text: '20th International Joint Conference on Computer Science and Software Engineering',
          subtext: '28th June – 1st July 2023\nNaresuan University, Pitsanulok, THAILAND'
        }
      }
    ]
  },
  {
    id: 1,
    title: 'Overview',
    content: [
      {
        type: 'list',
        data: {
          items: [
            { icon: 'Brain', text: 'Thinking General' },
            { icon: 'Cpu', text: 'What is RISC-V?' },
            { icon: 'Code', text: 'Grammar, Constants, Variables, and Operations' },
            { icon: 'ClipboardList', text: 'Code and Lab Etiquette' },
            { icon: 'Settings', text: 'Wiring, Assembling, Compiling, Linking, Loading, Running, and Looking' },
            { icon: 'Table', text: 'Six Tables, Six RISC-V ISA Extensions, and have some fun' },
            { icon: 'CheckCircle', text: 'Review and Wrap-up' }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    title: 'Famous Abstractions In History',
    content: [
      {
        type: 'timeline',
        data: {
          items: [
            {
              year: '1850s',
              title: 'G. W. F. Hegel - Dialectic Method',
              description: 'Unity of opposites, Negation of negation, quality versus quantity'
            },
            {
              year: '1910',
              title: 'Max Wertheimer - Gestalt Psychology',
              description: ''
            },
            {
              year: '1948',
              title: 'Feynman and Schwinger - Principle of Least Action',
              description: ''
            },
            {
              year: '1970',
              title: 'Christopher Booker - Story Telling',
              description: 'Obstacles, Rags to Riches, Quest, Voyage & Return, Comedy, Tragedy, Rebirth'
            },
            {
              year: '1987',
              title: 'Ian Holland - Principle of Least Knowledge',
              description: 'Law of Demeter, an object-oriented rule of style'
            },
            {
              year: '2010',
              title: 'Andrew Waterman and David Patterson - RISC-V',
              description: 'R-type, I-type, S-type, B-type, U-type, J-type'
            }
          ]
        }
      }
    ]
  },
  {
    id: 3,
    title: 'What is RISC-V?',
    subtitle: 'Reduced Instruction Set Computing',
    content: [
      {
        type: 'list',
        data: {
          items: [
            { icon: 'GraduationCap', text: 'Created at U.C. Berkeley to help people learn CPU design and put into public domain for all to freely use and revise' },
            { icon: 'Cpu', text: 'An "ISA" just like Intel x86, ARM, MIPS, VAX, Power PC, ...' },
            { icon: 'List', text: 'No more instructions than you\'ll ever need – only 82 of them' },
            { icon: 'Database', text: 'More registers than you\'ll ever need – 32 (less one)' }
          ]
        }
      },
      {
        type: 'text',
        data: {
          text: 'Instruction Set Architecture',
          subtext: 'สถาปัตยกรรม',
          centered: true
        }
      }
    ]
  },
  {
    id: 4,
    title: 'The RISC-V ISA',
    content: [
      {
        type: 'grid',
        data: {
          columns: 2,
          items: [
            {
              title: 'Instruction Formats',
              subtitle: 'Only 6 of them',
              content: [
                'R-type: Register operations',
                'I-type: Immediate operations',
                'S-type: Store operations',
                'B-type: Branch operations',
                'U-type: Upper immediate',
                'J-type: Jump operations'
              ]
            },
            {
              title: 'Register Set',
              subtitle: 'All ~82 instructions can be made with these six forms',
              content: [
                'Free to use any register for any purpose',
                '❓ Are S and B the same? Are U and J the same?'
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 5,
    title: 'Constant Values',
    content: [
      {
        type: 'text',
        data: {
          text: 'Two Ways to Build Constants',
          items: [
            { title: 'Short Immediate – 12-bits', subtitle: 'The I-type forms' },
            { title: 'Long Immediate – 20-bits', subtitle: 'The U- and J-type forms' }
          ]
        }
      },
      {
        type: 'grid',
        data: {
          columns: 2,
          items: [
            {
              title: 'Zero-extended (ขยายศูนย์)',
              code: '123 = 0000 0111 1011'
            },
            {
              title: 'Sign-extended (ขยาย"หนึ่ง")',
              code: '-123 = 1111 1000 0101'
            }
          ]
        }
      },
      {
        type: 'quote',
        data: {
          text: 'Instructions like sltiu replace need for carry or borrow flags!',
          subtitle: '"Set if (the source register is) Less Than a sign-extended Immediate, comparing as an Unsigned value"'
        }
      }
    ]
  },
  {
    id: 6,
    title: 'Variables Values',
    content: [
      {
        type: 'text',
        data: {
          text: 'Variables are the Registers',
          subtitle: 'Instructions work with at most three Registers:'
        }
      },
      {
        type: 'grid',
        data: {
          columns: 3,
          items: [
            { title: 'Source #1', subtitle: '"rs1"' },
            { title: 'Source #2', subtitle: '"rs2"' },
            { title: 'Destination', subtitle: '"rd"' }
          ]
        }
      },
      {
        type: 'text',
        data: {
          text: 'Memory Mapping',
          subtitle: 'Everything is memory-mapped, even the Registers'
        }
      },
      {
        type: 'code',
        data: {
          examples: [
            {
              code: 'or s0, s0, s1    # x[s0] = x[s0] + x[s1]',
              description: 'R-type instruction form to access a Register'
            },
            {
              code: 'csrrs s0, 0x1008, s1',
              description: 'I-type instruction form to Load or Store'
            }
          ]
        }
      }
    ]
  },
  {
    id: 7,
    title: 'Almost* All The Instructions You\'ll Ever Need',
    content: [
      {
        type: 'grid',
        data: {
          columns: 3,
          items: [
            {
              title: 'Arithmetic Operations',
              instructions: ['add', 'addi', 'sub', '', 'slt', 'slti', 'sltu', 'sltiu']
            },
            {
              title: 'Logical Operations',
              instructions: ['and', 'andi', 'or', 'ori', 'xor', 'xori']
            },
            {
              title: 'Bit-wise Shifts',
              instructions: ['sll', 'slli', 'srl', 'srli', 'sra', 'srai']
            },
            {
              title: 'Conditional Branches',
              instructions: ['beq', 'bne', 'bge', 'bgeu', 'blt', 'bltu']
            },
            {
              title: 'Memory Operations',
              instructions: ['lb', 'lbu', 'lh', 'lhu', 'lw', 'sb', 'sh', 'sw']
            },
            {
              title: 'Other Operations',
              sections: [
                { title: 'Constants:', instructions: ['auipc', 'lui'] },
                { title: 'Jumps:', instructions: ['jal', 'jalr'] }
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 8,
    title: 'Quiz',
    content: [
      {
        type: 'text',
        data: {
          title: 'Question 1',
          text: 'Do these have the same effect? What are the differences? What are the similarities?',
          codes: ['or x8, x8, x0', 'addi x8, x8, 0', 'slli x8, x8, 0']
        }
      },
      {
        type: 'text',
        data: {
          title: 'Question 2',
          text: 'Why is there no subi instruction? How else can you do this?',
          codes: ['subi s0, s0, 5     # x[s0] = x[s0] – 5    ???']
        }
      },
      {
        type: 'text',
        data: {
          title: 'Question 3',
          text: 'How many ways can you mimic a nop instruction?',
          extras: [
            'Why is there no ret instruction? What\'s in its place?',
            'Where are the "Small Constant" operations?',
            'Why are these instructions not in the RISC-V ISA?'
          ],
          codes: ['sla   slai   lwu   sbu    shu   swu']
        }
      }
    ]
  },
  {
    id: 9,
    title: 'The RISC-V Instruction Set Extensions',
    content: [
      {
        type: 'text',
        data: {
          text: 'Core Extensions',
          extensions: [
            { letter: 'I', name: 'Base', description: 'Integer arithmetic & logical, constant values, jumps, memory load & store' },
            { letter: 'M', name: 'Mathematical', description: 'Hardware multiply, divide, and remainder (modulus!)' },
            { letter: 'A', name: 'Atomic', description: 'Read, modify, and write, in a single transaction with no interruption' },
            { letter: 'C', name: 'Compressed', description: 'Memory-saving 16-bit word sizes' },
            { letter: 'U', name: 'Privileged', description: 'Interrupts, Machine, Hypervisor, Supervisor, User modes' }
          ]
        }
      },
      {
        type: 'text',
        data: {
          text: 'Additional Extensions',
          additionalExtensions: [
            { letter: 'V', name: 'Vector operations' },
            { letter: 'B', name: 'Bit-manipulations' },
            { letter: 'H', name: 'Hypervisor privilege' },
            { letter: 'N', name: 'User mode interrupts' },
            { letter: 'F', name: 'Single-precision FP' },
            { letter: 'D', name: 'Double-precision FP' },
            { letter: 'Q', name: 'Quad-precision FP' },
            { letter: 'J', name: 'Dynamic translations' },
            { letter: 'Z', name: 'Custom extensions' }
          ]
        }
      },
      {
        type: 'quote',
        data: {
          text: 'Get involved with draft and ratification process!',
          links: ['https://github.com/riscv', 'https://riscv.org/technical/specifications/']
        }
      }
    ]
  },
  {
    id: 10,
    title: 'How RISC-V Fits in the SoC',
    content: [
      {
        type: 'grid',
        data: {
          columns: 2,
          items: [
            {
              title: 'Debug Interface',
              description: 'OpenOCD via USB, FT232R MPSSE, JTAG'
            },
            {
              title: 'SoC Core',
              description: 'FE310-G002 SoC'
            },
            {
              title: 'Memory Map',
              memoryMap: [
                'CSR: x300',
                'GPR: x1000',
                'FPR: x1040',
                'VR: x1400',
                'ROM: x10000',
                'RAM: x20000'
              ]
            },
            {
              title: 'Boot Flow',
              description: 'After reset, flow ends at base of Flash (1<<17)'
            }
          ]
        }
      },
      {
        type: 'text',
        data: {
          text: 'Documentation References',
          docs: [
            { title: 'Unprivileged Architecture', file: 'riscv-spec-20191213.pdf' },
            { title: 'Privileged Architecture', file: 'riscv-privileged-20211203.pdf' },
            { title: 'Debug Specification', file: 'riscv-debug-release-0.13.2-20190522.pdf' },
            { title: 'Boot Code Source', file: 'SiFive forums discussion' }
          ]
        }
      }
    ]
  },
  {
    id: 11,
    title: 'Development Setup',
    content: [
      {
        type: 'steps',
        data: {
          steps: [
            {
              number: 1,
              title: 'Install Toolchain',
              description: 'riscv64-unknown-elf-toolchain-10.2.0-2020.12.8-x86_64-w64-mingw32.zip'
            },
            {
              number: 2,
              title: 'Install Loader',
              description: 'xpack-openocd-0.11.0-5-win32-x64.zip'
            },
            {
              number: 3,
              title: 'Configure Environment',
              description: 'Set environment variables – point to \'/bin\' folders'
            },
            {
              number: 4,
              title: 'Install GNU Make',
              description: 'Install Gnu make.exe program – anywhere in path'
            },
            {
              number: 5,
              title: 'Configure Drivers',
              description: 'Use Zadig utility to replace ftdi drivers with libusbK'
            }
          ]
        }
      },
      {
        type: 'grid',
        data: {
          columns: 2,
          items: [
            {
              title: 'Build Commands',
              code: 'make –f jcsse.mk ramload',
              subtitle: 'or: ramrun | ramdebug | romload | romrun | romdebug',
              files: [
                'jcsse.mk - Main makefile',
                'start.s - Boot assembly',
                'my-soc.lds - Linker script'
              ]
            },
            {
              title: 'Toolchain Flow',
              flow: [
                '1. Compile (.c → .o)',
                '2. Assemble (.s → .o)',
                '3. Link (.o → .elf)',
                '4. Load & Debug'
              ],
              recommendation: 'Use Notepad, TextPad, vi(m), etc., for best results'
            }
          ]
        }
      }
    ]
  }
];

export const tableOfContents = [
  { slide: 0, title: 'Title Slide', description: 'RISC-V Hands-On Workshop' },
  { slide: 1, title: 'Overview', description: 'Workshop Topics and Structure' },
  { slide: 2, title: 'Famous Abstractions', description: 'Historical Context and Principles' },
  { slide: 3, title: 'What is RISC-V?', description: 'Introduction to RISC-V Architecture' },
  { slide: 4, title: 'RISC-V ISA', description: 'Instruction Set Architecture' },
  { slide: 5, title: 'Constant Values', description: 'Immediate Values and Extensions' },
  { slide: 6, title: 'Variables and Registers', description: 'Memory Mapping and Register Usage' },
  { slide: 7, title: 'Instruction Set', description: 'Complete RISC-V Instructions' },
  { slide: 8, title: 'Quiz', description: 'Practice Questions' },
  { slide: 9, title: 'Extensions', description: 'RISC-V ISA Extensions' },
  { slide: 10, title: 'SoC Integration', description: 'System on Chip Architecture' },
  { slide: 11, title: 'Development Setup', description: 'Toolchain and Project Structure' }
];
