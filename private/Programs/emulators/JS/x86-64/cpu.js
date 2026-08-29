
//this is a simple x86-64 emulator written in javascript. It is not a full emulator, but it can run simple programs. It is not optimized for speed, but for simplicity and clarity. 




class Bus{
    constructor(){
        this.ROM = new Uint8Array(0x10000);
        this.RAM = this.ROM; //new Uint8Array(0x10000); // 64KB of RAM
        this.IO = new Uint8Array(0x100); // 256 bytes of I/O space
    }
    writeRAM(addr, value){
        this.RAM[addr] = value;
    }
    readRAM(addr){
        return this.RAM[addr];
    }
    writeROM(addr, value){
        this.ROM[addr] = value;
    }
    readROM(addr){
        return this.ROM[addr];
    }
    writeIO(addr, value){
        this.IO[addr] = value;
    }
    readIO(addr){
        return this.IO[addr];
    }
}

class CPU{
    constructor(bus){
        this.bus = bus;
        this.RAM = this.bus.RAM;
        this.OP=0;
        this.HALT=false;
        this.ARG1=0;
        this.ARG2=0;
        this.RIP = 1; // instruction pointer
        this.RAX = 0; // accumulator
        this.RBX = 0; // base register
        this.RCX = 0; // counter register
        this.RDX = 0; // data register
        this.RSI = 0; // source index
        this.RDI = 0; // destination index
        this.RSP = 0x10000; // stack pointer
        this.RBP = 0; // base pointer
    }
    execute(){
        if(this.HALT) return;
        this.OP = this.bus.readRAM(this.RIP);
        this.ARG1 = this.bus.readRAM(this.RIP + 1);
        this.ARG2 = this.bus.readRAM(this.RIP + 2);
        if(this.OP == 0x01){ // MOV RAX, imm64
            if(this.ARG1 == 0x00){
                this.RAX = this.ARG2;
            }else if(this.ARG1 == 0x01){
                this.RBX = this.ARG2;
            }else if(this.ARG1 == 0x02){
                this.RCX = this.ARG2;
            }else if(this.ARG1 == 0x03){
                this.RDX = this.ARG2;
            }else if(this.ARG1 == 0x04){
                this.RSI = this.ARG2;
            }else if(this.ARG1 == 0x05){
                this.RDI = this.ARG2;
            }else if(this.ARG1 == 0x06){
                this.RSP = this.ARG2;
            }else if(this.ARG1 == 0x07){
                this.RBP = this.ARG2;
            }
            this.RIP += 3;
        }
        if(this.OP == 0x02){ 
            if(this.ARG1 == 0x00){
                this.RAX = this.RBX;
            }else if(this.ARG1 == 0x01){
                this.RBX = this.RAX;
            }else if(this.ARG1 == 0x02){
                this.RCX = this.RAX;
            }else if(this.ARG1 == 0x03){
                this.RDX = this.RAX;
            }else if(this.ARG1 == 0x04){
                this.RSI = this.RAX;
            }else if(this.ARG1 == 0x05){
                this.RDI = this.RAX;
            }else if(this.ARG1 == 0x06){
                this.RSP = this.RAX;
            }else if(this.ARG1 == 0x07){
                this.RBP = this.RAX;
            }
            this.RIP += 3;
        }
        if(this.OP == 0x03){ // ADD RAX, imm64
            this.RAX += this.ARG1;
            this.RIP += 3;
        }
        if(this.OP == 0x04){ // SUB RAX, imm64
            this.RAX -= this.ARG1;
            this.RIP += 3;
        }
        if(this.OP == 0x05){ // MUL RAX, imm64
            this.RAX *= this.ARG1;
            this.RIP += 3;
        }
        if(this.OP == 0x06){ // DIV RAX, imm64
            this.RAX /= this.ARG1;
            this.RIP += 3;
        }
        if(this.OP == 0x07){ // JMP imm64
            this.RIP = this.ARG1;
        }
        if(this.OP == 0x08){ // CMP RAX, imm64
            if(this.RAX == this.ARG1){
                this.RIP += 3;
            }else{
                this.RIP += 6;
            }
        }
        if(this.OP == 0x09){ // JE imm64
            if(this.RAX == this.ARG1){
                this.RIP = this.ARG2;
            }else{
                this.RIP += 3;
            }
        }
        if(this.OP == 0x0A){ // JNE imm64
            if(this.RAX != this.ARG1){
                this.RIP = this.ARG2;
            }else{
                this.RIP += 3;
            }
        }
        if(this.OP == 0x0B){ // CALL imm64
            this.RSP -= 8;
            this.bus.writeRAM(this.RSP, this.RIP + 3);
            this.RIP = this.ARG1;
        }
        if(this.OP == 0x0C){ // RET
            this.RIP = this.bus.readRAM(this.RSP);
            this.RSP += 8;
        }
        if(this.OP == 0x0D){ // PUSH RAX
            this.RSP -= 8;
            this.bus.writeRAM(this.RSP, this.RAX);
            this.RIP += 1;
        }
        if(this.OP == 0x0E){ // POP RAX
            this.RAX = this.bus.readRAM(this.RSP);
            this.RSP += 8;
            this.RIP += 1;
        }
        if(this.OP == 0xFF){ // HALT
            this.HALT = true;
        }
    }
}

class Bios{
    constructor(bus){
        this.bus = bus;
        this.loadBIOS();
    }
    loadBIOS(){
        // Load a simple BIOS program into ROM
        this.bus.writeRAM(0x0000, 0x01); // MOV RAX, 0x00
        this.bus.writeRAM(0x0001, 0x00);
        this.bus.writeRAM(0x0002, 0x00);
        this.bus.writeRAM(0x0003, 0x07); // JMP 0x0000
        this.bus.writeRAM(0x0004, 0x00);
    }
    compileAndLoadProgram(program){
        // Compile the program into machine code and load it into RAM
        let addr = 0x0000;
        for(let i = 0; i < program.length; i++){
            this.bus.writeRAM(addr, program[i]);
            addr++;
        }
    }
}


function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function Boot(bus, cpu) {
    // Load a simple program into RAM
    bus.writeRAM(0x0000, 0x01); // MOV RAX, 0x05
    bus.writeRAM(0x0001, 0x00);
    bus.writeRAM(0x0002, 0x05);
    bus.writeRAM(0x0003, 0x03); // ADD RAX, 0x03
    bus.writeRAM(0x0004, 0x00);
    bus.writeRAM(0x0005, 0x03);
    bus.writeRAM(0x0006, 0x07); // JMP 0x0003
    bus.writeRAM(0x0007, 0x03);
    bus.writeRAM(0x0008, 0x00);
}
