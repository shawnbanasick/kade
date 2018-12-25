
  function zeros(i){
      const array = [];
      for (let z=0; z<i; z+=1) {
      	const temp = [];
        temp.length = i;
        temp.fill(0);
        array.push(temp);
      }
      return array;
    }
 
    // translated from http://stitchpanorama.sourceforge.net/Python/svd.py
   const svd =  function(A){
        let temp;
        // Compute the thin SVD from G. H. Golub and C. Reinsch, Numer. Math. 14, 403-420 (1970)
        let prec = (2 ** -52); // assumes double prec
        const tolerance = 1.e-64/prec;
        const itmax = 50;
        let c = 0;
        let i = 0;
        let j = 0;
        let k = 0;
        let l = 0;
        
        const u = A.map((row) => row.slice(0));
        const m = u.length;
        const n = u[0].length;
        
        // console.assert(m >= n, 'Need more rows than columns');
        
        
      const e = [];
      e.length = n;
      e.fill(0);
      
      const q = e.slice();    
      const v = zeros(n,n);
        
        function pythag(a,b){
            a = Math.abs(a);
            b = Math.abs(b);
            if (a > b) {
                return a*Math.sqrt(1.0+(b*b/a/a));
            }
            else if (b === 0) {
                return a;
            }
            return b*Math.sqrt(1.0+(a*a/b/b))
        }

        // Householder's reduction to bidiagonal form
        let f = 0;
        let g = 0;
        let h = 0;
        let x = 0;
        let y = 0;
        let z = 0;
        let s = 0;
        
        for (i=0; i < n; i+=1)
        {
            e[i]= g;
            s= 0.0;
            l= i+1;
            for (j=i; j < m; j+=1) 
                s += (u[j][i]*u[j][i]);
            if (s <= tolerance) {
                g= 0.0;
            }
            else
            {
                f= u[i][i];
                g= Math.sqrt(s);
                if (f >= 0.0) g= -g;
                h= f*g-s;
                u[i][i]=f-g;
                for (j=l; j < n; j+=1)
                {
                    s= 0.0
                    for (k=i; k < m; k+=1) {
                        s += u[k][i]*u[k][j];
                    } 
                    f= s/h;
                    for (k=i; k < m; k+=1) {
                        u[k][j]+=f*u[k][i];
                    } 
                }
            }
            q[i]= g;
            s= 0.0;
            for (j=l; j < n; j+=1) {
                s += u[i][j]*u[i][j];
            }
            if (s <= tolerance) {
                g= 0.0;
            }
            else
            {
                f= u[i][i+1];
                g= Math.sqrt(s);
                if (f >= 0.0) { g= -g };
                h= f*g - s;
                u[i][i+1] = f-g;
                for (j=l; j < n; j+=1) { e[j] = u[i][j]/h; };
                for (j=l; j < m; j+=1)
                {
                    s=0.0;
                    for (k=l; k < n; k+=1) 
                        { s += (u[j][k]*u[i][k]); };
                    for (k=l; k < n; k+=1) 
                        { u[j][k]+=s*e[k]; };
                }
            }
            y = Math.abs(q[i])+Math.abs(e[i]);
            if (y > x) 
               { x = y; }
        }
        
        // accumulation of right hand gtransformations
        for (i=n-1; i !== -1; i+= -1)
        {
            if (g !== 0.0)
            {
                h= g*u[i][i+1];
                for (j=l; j < n; j+=1) 
                    { v[j][i]=u[i][j]/h; }
                for (j=l; j < n; j+=1)
                {
                    s = 0.0;
                    for (k=l; k < n; k+=1) 
                        { s += u[i][k]*v[k][j]; };
                    for (k=l; k < n; k+=1) 
                        { v[k][j]+=(s*v[k][i]); };
                }
            }
            for (j=l; j < n; j+=1)
            {
                v[i][j] = 0;
                v[j][i] = 0;
            }
            v[i][i] = 1;
            g= e[i];
            l= i;
        };
        
        // accumulation of left hand transformations
        for (i=n-1; i !== -1; i+= -1)
        {
            l= i+1;
            g= q[i];
            for (j=l; j < n; j+=1) 
                { u[i][j] = 0; };
            if (g !== 0.0)
            {
                h= u[i][i]*g;
                for (j=l; j < n; j+=1)
                {
                    s=0.0;
                    for (k=l; k < m; k+=1) { s += u[k][i]*u[k][j]; };
                    f= s/h;
                    for (k=i; k < m; k+=1) { u[k][j]+=f*u[k][i]; };
                }
                for (j=i; j < m; j+=1) { u[j][i] /= g; };
            }
            else
                for (j=i; j < m; j+=1) { u[j][i] = 0; };
            u[i][i] += 1;
        }
        
        // diagonalization of the bidiagonal form
        prec *= x;
        for (k=n-1; k !== -1; k+= -1)
        {
            for (let iteration=0; iteration < itmax; iteration+=1)
            {// test f splitting
                let testConvergence = false;
                for (l=k; l !== -1; l+= -1)
                {
                    if (Math.abs(e[l]) <= prec){
                        testConvergence= true;
                        break; 
                    }
                    if (Math.abs(q[l-1]) <= prec)
                       { break; } 
                }
                if (!testConvergence){
                    // cancellation of e[l] if l>0
                    c= 0.0;
                    s= 1.0;
                    const l1= l-1;
                    for (i =l; i<k+1; i+=1)
                    {
                        f= s*e[i];
                        e[i] *= c;
                        if (Math.abs(f) <= prec)
                            { break; }
                        g= q[i];
                        h= pythag(f,g);
                        q[i]= h;
                        c= g/h;
                        s= -f/h;
                        for (j=0; j < m; j++)
                        {
                            y= u[j][l1]
                            z= u[j][i]
                            u[j][l1] =  y*c+(z*s)
                            u[j][i] = -y*s+(z*c)
                        } 
                    }
                }
                // test f convergence
                z= q[k]
                if (l=== k){
                    //convergence
                    if (z<0.0)
                    { //q[k] is made non-negative
                        q[k]= -z
                        for (j=0; j < n; j++)
                            v[j][k] = -v[j][k]
                    }
                    break  //break out of iteration loop and move on to next k value
                }

                console.assert(iteration < itmax-1, 'Error: no convergence.');

                // shift from bottom 2x2 minor
                x= q[l]
                y= q[k-1]
                g= e[k-1]
                h= e[k]
                f= ((y-z)*(y+z)+(g-h)*(g+h))/(2.0*h*y)
                g= pythag(f,1.0)
                if (f < 0.0)
                    f= ((x-z)*(x+z)+h*(y/(f-g)-h))/x
                else
                    f= ((x-z)*(x+z)+h*(y/(f+g)-h))/x
                // next QR transformation
                c= 1.0
                s= 1.0
                for (i=l+1; i< k+1; i++)
                {
                    g = e[i]
                    y = q[i]
                    h = s*g
                    g = c*g
                    z = pythag(f,h)
                    e[i-1] = z
                    c = f/z
                    s = h/z
                    f = x*c+g*s
                    g = -x*s+g*c
                    h = y*s
                    y = y*c
                    for (j =0; j < n; j++)
                    {
                        x = v[j][i-1]
                        z = v[j][i]
                        v[j][i-1]  = x*c+z*s
                        v[j][i]  = -x*s+z*c
                    }
                    z = pythag(f,h)
                    q[i-1] = z
                    c = f/z
                    s = h/z
                    f = c*g+s*y
                    x = -s*g+c*y
                    for (j =0; j < m; j++)
                    {
                        y = u[j][i-1]
                        z = u[j][i]
                        u[j][i-1]  = y*c+z*s
                        u[j][i]  = -y*s+z*c
                    }
                }
                e[l] = 0.0
                e[k] = f
                q[k] = x
            } 
        }
            
        // vt = transpose(v)
        // return (u,q,vt)
        for (let i=0, qLen=q.length;i<qLen; i++) 
            if (q[i] < prec) q[i] = 0
          
        // sort eigenvalues
        for (i=0; i< n; i++){ 
            // writeln(q)
            for (j=i-1; j >= 0; j--){
                if (q[j] < q[i]){
                    // writeln(i,'-',j)
                    c = q[j]
                    q[j] = q[i]
                    q[i] = c
                    for (let k=0, uLen=u.length;k<uLen;k++) { temp = u[k][i]; u[k][i] = u[k][j]; u[k][j] = temp; }
                    for (let k=0, vLen=v.length;k<vLen;k++) { temp = v[k][i]; v[k][i] = v[k][j]; v[k][j] = temp; }
                    i = j   
                }
            }
        }
        return { U:u, S:q, V:v }
    }

  export default svd;